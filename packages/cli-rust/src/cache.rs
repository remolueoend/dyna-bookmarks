use crate::doc::ParsedBookmarks;
use eyre::Result;
use log::info;
use serde::{Deserialize, Serialize};
use std::{fs, path::PathBuf};
use xdg::BaseDirectories;

#[derive(Debug, Deserialize, Serialize)]
struct CacheContent {
    bookmarks: ParsedBookmarks,
}

pub fn read_from_cache(cache_path: &PathBuf) -> Result<ParsedBookmarks> {
    let cache_content = fs::read_to_string(cache_path)?;
    info!("trying to parse: {}", cache_content);
    let cache: CacheContent = toml::from_str(&cache_content)?;

    return Ok(cache.bookmarks);
}

/// Writes the given parsed bookmarks to the local cache.
pub fn write_to_cache(cache_path: &PathBuf, bookmarks: &ParsedBookmarks) -> Result<()> {
    let xdg = BaseDirectories::with_prefix("dyna-bookmarks")?;
    xdg.place_cache_file(&cache_path)?;
    let stringified = toml::to_string(&CacheContent {
        bookmarks: bookmarks.to_vec(),
    })?;
    fs::write(cache_path, stringified)?;

    Ok(())
}
