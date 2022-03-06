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
pub async fn run_commands(args: SyncCommandArgs) -> Result<()> {
    sync_document_to_cache(
        &args.api_args.api_token,
        &args.api_args.document_id,
        &args
            .file_args
            .get_cache_file_path(&args.api_args.document_id)?,
    )
    .await?;
    Ok(())
}

/// Downloads and parses the content of the dynalist.io document with the given document id.
/// The parsed content is stored in a local cache file.
pub async fn sync_document_to_cache(
    api_token: &String,
    document_id: &String,
    cache_path: &PathBuf,
) -> Result<()> {
    let api_client = ApiClient::new(api_token);
    let doc = api_client.get_document(document_id).await?;
    let parsed_bookmarks = doc::parse_document(&doc);
    cache::write_to_cache(cache_path, &parsed_bookmarks)
}
