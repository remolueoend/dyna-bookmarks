use crate::{
    cache::read_from_cache,
    cli::{ApiAccessArgs, LocalFilesArgs},
    rofi,
};
use clap::Parser;
use eyre::Result;
use log::warn;
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
    #[clap(long, default_value = "xdg-open")]
    open_exe: PathBuf,
}

pub fn run_commands(args: RofiCommandArgs) -> Result<()> {
    let cache_result = read_from_cache(
        &args
            .file_args
            .get_cache_file_path(&args.api_args.document_id)?,
    );
    match cache_result {
        Ok(bookmarks) => {
            let bookmark = rofi::show_rofi_dialog(args.rofi_exe, &bookmarks)?;
            Command::new(args.open_exe).arg(&bookmark.1).spawn()?;
        }
        Err(err) => {
            warn!("failed to read cache: {}, re-fetching document", err);
            // TODO re-sync the bookmarks first, open them in rofi and write them to the cache.
        }
    };

    Ok(())
}
