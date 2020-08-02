# Dyna-Bookmarks CLI

This package consists of tools to manage bookmarks saved in a dynalist document directly from the CLI.

## Open a bookmark
Shows a rofi dropdown listing all available bookmarks loaded from dynalist. The script caches the last available result while downloading a new version of the bookmarks in the background (~offline first).

bookmark URIs of scheme `cmd://` are handled separately by executing the given command in a new shell instance (trust the bookmarks you load! They may execute arbitrary commands on your local device).
```sh
./open-bookmark
```

* Dependencies: `node`, `awk`, `rofi`, `sed`, `xdg-open`.
* Environment variables: `TOKEN=dynalist API token`, `DOCUMENT_ID=dynalist file ID`, `TERMINAL=terminal emulator binary`
