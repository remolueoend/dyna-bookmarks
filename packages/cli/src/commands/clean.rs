use crate::cli::LocalFilesArgs;
use clap::Parser;
use eyre::Result;
use std::fs;

#[derive(Parser, Debug)]
pub struct CleanCommandArgs {
    #[clap(flatten)]
    file_args: LocalFilesArgs,
    /// the ID of the dynalist.io document.
    #[clap(long, env)]
    pub document_id: String,
}

/// removes the local cache file.
pub fn run_command(args: CleanCommandArgs) -> Result<()> {
    let cache_path = args.file_args.get_cache_file_path(&args.document_id)?;
    if cache_path.exists() {
        fs::remove_file(&cache_path)?;
    }

    Ok(())
}
