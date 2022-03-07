use clap::{Parser, Subcommand};
use eyre::Result;
use std::path::{Path, PathBuf};
use xdg::BaseDirectories;

use crate::commands::{clean::CleanCommandArgs, rofi::RofiCommandArgs, sync::SyncCommandArgs};

#[derive(Parser, Debug)]
pub struct ApiAccessArgs {
    /// the ID of the dynalist.io document.
    #[clap(long, env)]
    pub document_id: String,

    /// the API token provided by dynalist.io.
    #[clap(long, env)]
    pub api_token: String,
}

#[derive(Parser, Debug)]
pub struct LocalFilesArgs {
    /// Path to the locally cached dynalist.io document [default: XDG_CACHE_HOME/dynalist-bookmarks/<document-id>]
    #[clap(long)]
    cache_dir: Option<String>,
}
impl LocalFilesArgs {
    /// Returns the path to the local cache file for the given document id.
    /// The path of the cache directory is either user provided or `$XDG_CACHE_HOME/dyna-bookmarks/`.
    pub fn get_cache_file_path(&self, document_id: &String) -> Result<PathBuf> {
        match &self.cache_dir {
            Some(cache_dir) => Ok(Path::new(&cache_dir).join(document_id)),
            None => {
                let xdg = BaseDirectories::with_prefix("dyna-bookmarks")?;
                Ok(xdg.get_cache_file(document_id))
            }
        }
    }
}

#[derive(Parser, Debug)]
#[clap(about, version, author, rename_all_env = "snake_case")]
pub struct CliArgs {
    /// set the level of verbosity (add multiple to increase level, e.g. -vvv).
    #[clap(short = 'v', long, parse(from_occurrences))]
    pub verbosity: u64,

    #[clap(subcommand)]
    pub command: SubCommandArgs,
}

#[derive(Subcommand, Debug)]
pub enum SubCommandArgs {
    /// Open a rofi dialog for selecting and opening of a bookmark.
    Rofi(RofiCommandArgs),
    /// Sync the dynalist.io remote document to the local cache.
    Sync(SyncCommandArgs),
    /// Delete the local cache.
    Clean(CleanCommandArgs),
}
