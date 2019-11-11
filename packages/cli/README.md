# Dyna-Bookmarks CLI

This package consists of tools to manage bookmarks saved in a dynalist document directly from the CLI.

## Open a bookmark
```sh
./open-bookmark
```

* Dependencies: `node`, `awk`, `rofi`, `sed`, `xdg-open`.
* Environment variables: `TOKEN=dynalist API token`, `DOCUMENT_ID=dynalist file ID`, `FILE=path to file explorer binary`
