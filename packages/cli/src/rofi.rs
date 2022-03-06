use crate::doc::{ParsedBookmark, ParsedBookmarks};
use eyre::{eyre, Context, Result};
use log::debug;
use serde_json::from_str;
use std::io::{Read, Write};
use std::path::PathBuf;
use std::process::{Command, Stdio};

/// Opens a rofi dialog and lets the user select a bookmark of the given list of bookmarks.
/// This method returns the selected bookmark.
pub fn show_rofi_dialog<'a>(
    rofi_path: &PathBuf,
    bookmarks: &'a ParsedBookmarks,
) -> Result<&'a ParsedBookmark> {
    debug!("spawning rofi process");
    let rofi_input = create_rofi_input(bookmarks);
    let cmd = Command::new(rofi_path)
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .arg("-dmenu") // simulate dmenu behavior
        .arg("-i") // makes dmenu searches case-insensitive
        .args(["-format", "i"]) // output the index of the selected item instead of its text (0-indexed)
        .spawn()?;

    cmd.stdin
        .expect("failed to access rofi stdin")
        .write_all(rofi_input.as_bytes())
        .wrap_err("failed to pipe into rust")?;

    let mut output = String::new();
    cmd.stdout
        .expect("failed to access rofi stdout")
        .read_to_string(&mut output)?;
    let selected_bookmark_idx = from_str::<usize>(&output)
        .wrap_err_with(|| format!("Could not parse rofi output: {}", output))?;

    if selected_bookmark_idx < bookmarks.len() {
        Ok(&bookmarks[selected_bookmark_idx])
    } else {
        Err(eyre!(
            "rofi output out of bounds: {}",
            selected_bookmark_idx
        ))
    }
}

fn create_rofi_input(bookmarks: &ParsedBookmarks) -> String {
    bookmarks
        .iter()
        .map(|b| b.0.to_owned())
        .collect::<Vec<String>>()
        .join("\n")
}
