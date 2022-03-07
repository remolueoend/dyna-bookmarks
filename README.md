# Dyna-Bookmarks

This repository provides a CLI binary to interact with bookmarks stored in a remote document at https://dynalist.io. To get started, create a new document at https://dynalist.io containing your bookmarks. Each (sub-) node in the document is either a directory node or a leaf node: Both of them may consist of arbitrary text or of a title and a URL formatted as Markdown. When running the command `dyna-bookmarks rofi`, the bookmarks of your document are displayed as a flatten list in a [rofi](https://github.com/davatorium/rofi) dialog, allowing you to fuzzy-search, select and open a bookmark. Let's look at an example document:
```
* To Read
|- * [Blogs](https://my-rss-reader.org)
|  |- * [my fav blog](https://my-fav-blog.org)
|  |- * [another blog](https://another.org)
| 
|- * Books
|  |- * [a good novel](https://a-good-novel.org)
|
|- * Some Notes
   |- * these nodes will not be displayed in `rofi`
   |- * they do not contain any links
```

The document above will be rendered as the following list in `rofi`:
```
Books/a good novel
To Read/Blogs
To Read/Blogs/my fav blog
To Read/Blogs/another blog
```
* Directory nodes which themselves consist of a link will be rendered as their own bookmark
* Leaf nodes not consisting of a link will be ignored.
* If a node is marked as checked on dynalist.io, the node and all its children are ignored.

# Installation & Setup
There are currently no pre-build binaries available. Use the [rustup](https://rustup.rs/) toolchain to build your binary by running `cargo build --release` in this project directory. You'll find the binary under `./target/release/dyna-bookmarks`.

Most commands require a document ID and an API token. The ID of your bookmarks document can be found in the URL (last segment) when opening the document on dynalist.io. Your **personal** API key can be found at the [dynalist developer page](https://dynalist.io/developer).

# Command Overview
```
dyna-bookmarks 0.1.0
remolueoend
Allows managing and opening bookmarks stored in a dynalist.io document

USAGE:
    dyna-bookmarks [OPTIONS] <SUBCOMMAND>

OPTIONS:
    -h, --help         Print help information
    -v, --verbosity    set the level of verbosity (add multiple to increase level, e.g. -vvv)
    -V, --version      Print version information

SUBCOMMANDS:
    clean    Delete the local cache
    help     Print this message or the help of the given subcommand(s)
    rofi     Open a rofi dialog for selecting and opening a bookmark
    sync     Sync the dynalist.io remote document to the local cache
```
Use `dyna-bookmarks <COMMAND> --help` to get a detailed description of a command.

## `rofi` Command
`dyna-bookmarks rofi` is probably the most useful command. It displays a `rofi` dialog for selecting and opening a bookmark. For performance reasons, `dyna-bookmarks` caches the parsed content of your dynalist.io document in a local file. When running `dyna-bookmarks rofi`, the content of the local cache file is used to display the list of bookmarks, while the local cache is refreshed in the background by downloading the remote document. This procedure is usually known as offline-first.

## `sync` Command
Use this command to update your local cache with the current version of the dynalist.io document.

## `clean` Command
This command deletes the local cache. When running `dyna-bookmarks rofi` afterward, the local cache is initiated again before displaying the `rofi` dialog.

# Props
Special thanks to [Dynalist](https://dynalist.io/) for their amazing tool.
