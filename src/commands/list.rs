use clap::Parser;
use eyre::Result;
use log::error;

use crate::{cache, cli::LocalFilesArgs};

#[derive(Debug, Parser)]
pub struct ListCommandArgs {
    #[clap(flatten)]
    file_args: LocalFilesArgs,
    /// the ID of the dynalist.io document.
    #[clap(long, env)]
    pub document_id: String,
}

pub fn run_command(args: ListCommandArgs) -> Result<()> {
    let cache_path = args.file_args.get_cache_file_path(&args.document_id)?;
    let booksmarks = cache::read_from_cache(&cache_path);

    match booksmarks {
        Ok(bookmarks) => {
            for b in bookmarks {
                println!("{}\t{}", b.0, b.1);
            }
        }
        Err(err) => {
            error!(
                "failed to read local cache at {}: {}",
                &cache_path.to_str().unwrap_or_default(),
                err
            );
        }
    };

    Ok(())
}
