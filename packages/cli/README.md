# Dyna-Bookmarks CLI

This package consists of tools to manage bookmarks saved in a dynalist document directly from the CLI.

## Open a bookmark
Shows a rofi dropdown listing all available bookmarks loaded from dynalist. The script caches the last available result while downloading a new version of the bookmarks in the background (~offline first).

bookmark URIs of scheme `file://` are handled separately by opening the file explorer configured as `$FILE`. `xdg-open` does not handle these URIs as expected.
```sh
./open-bookmark
```

* Dependencies: `node`, `awk`, `rofi`, `sed`, `xdg-open`.
* Environment variables: `TOKEN=dynalist API token`, `DOCUMENT_ID=dynalist file ID`, `TERMINAL=terminal emulator binary`, `FILE=path to file explorer binary`
