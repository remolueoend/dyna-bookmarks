use std::path::PathBuf;

use crate::{api::ApiClient, cache, doc};
use clap::Parser;
use eyre::Result;

use crate::cli::{ApiAccessArgs, LocalFilesArgs};

#[derive(Parser, Debug)]
pub struct SyncCommandArgs {
    #[clap(flatten)]
    api_args: ApiAccessArgs,
    #[clap(flatten)]
    file_args: LocalFilesArgs,
}

/// Runs the sync CLI command by downloading and parsing the content of the dynalist.io document
/// with the given document id.
/// The parsed content is stored in a local cache file.
pub fn run_command(args: SyncCommandArgs) -> Result<()> {
    let cache_path = args
        .file_args
        .get_cache_file_path(&args.api_args.document_id)?;

    sync_document_to_cache(SyncToCacheArgs {
        api_token: args.api_args.api_token,
        cache_path,
        document_id: args.api_args.document_id,
    })?;
    Ok(())
}

#[derive(Clone)]
pub struct SyncToCacheArgs {
    pub api_token: String,
    pub document_id: String,
    pub cache_path: PathBuf,
}

/// Downloads and parses the content of the dynalist.io document with the given document id.
/// The parsed content is stored in a local cache file.
pub fn sync_document_to_cache(args: SyncToCacheArgs) -> Result<()> {
    let api_client = ApiClient::new(&args.api_token);
    let doc = api_client.get_document(&args.document_id)?;
    let parsed_bookmarks = doc::parse_document(&doc);
    cache::write_to_cache(&args.cache_path, &parsed_bookmarks)
}
