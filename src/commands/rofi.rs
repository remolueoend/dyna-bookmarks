use super::sync::SyncToCacheArgs;
use crate::{
    cache::read_from_cache,
    cli::{ApiAccessArgs, LocalFilesArgs},
    commands::sync::sync_document_to_cache,
    rofi,
};
use clap::Parser;
use color_eyre::Report;
use eyre::Result;
use log::{debug, warn};
use std::thread::{self, JoinHandle};
use std::{path::PathBuf, process::Command};

#[derive(Parser, Debug)]
pub struct RofiCommandArgs {
    #[clap(flatten)]
    api_args: ApiAccessArgs,
    #[clap(flatten)]
    file_args: LocalFilesArgs,
    /// path to the rofi executable.
    #[clap(long, default_value = "rofi")]
    rofi_exe: PathBuf,
    /// the path of the binary to use for opening bookmarks.
    #[clap(long, default_value = "xdg-open")]
    open_exe: PathBuf,
}

/// First tries to read the content of the cache file. If it fails, it syncs the local document
/// and tries to read the cache again. After successfully reading the cache, a rofi dialog is shown
/// allowing the user to select a bookmark and opens it.
/// While the rofi dialog is shown, the remote document is synced in the background (if not done so already).
/// This procedure is usually known as 'offline-first'.
pub fn run_command(args: RofiCommandArgs) -> Result<()> {
    let cache_path = args
        .file_args
        .get_cache_file_path(&args.api_args.document_id)?;
    let sync_args = SyncToCacheArgs {
        api_token: args.api_args.api_token,
        document_id: args.api_args.document_id,
        cache_path: cache_path.to_owned(),
    };
    // try to read the local cache the first time:
    let mut cache_result = read_from_cache(&cache_path);
    let mut synced = false;

    if let Err(err) = cache_result {
        // cache was not readable. Initiate a (synchronous) sync from remote document to local cache:
        warn!("failed to read cache: {}, re-fetching document", err);
        sync_document_to_cache(sync_args.clone())?;
        // read again from cache after syncing it:
        cache_result = read_from_cache(&cache_path);
        synced = true;
    }

    // this is either the result from initially reading the cache or after syncing it:
    match cache_result {
        Err(err) => {
            // we failed to read the cache once again, abort:
            return Err(err.wrap_err("failed to ready cache after sync"));
        }
        Ok(bookmarks) => {
            debug!("successfully extracted bookmarks from local cache");
            // run a background sync if the cache has not already been synced before:
            let mut bg_sync: Option<JoinHandle<Result<(), Report>>> = None;
            if !synced {
                debug!("spawning background sync task");
                bg_sync = Some(thread::spawn(move || sync_document_to_cache(sync_args)));
            }
            let bookmark = rofi::show_rofi_dialog(&args.rofi_exe, &bookmarks)?;
            debug!(
                "spawning {} with url {}",
                &args.open_exe.to_str().unwrap_or_default(),
                &bookmark.1
            );
            Command::new(&args.open_exe).arg(&bookmark.1).spawn()?;

            // wait for the background sync if it has been started:
            match bg_sync {
                Some(task) => {
                    task.join().expect("failed to wait for background sync")?;
                    debug!("background sync task finished successfully.")
                }
                None => {}
            }
        }
    };

    Ok(())
}
