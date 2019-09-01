import { connect } from "react-redux"
import { AppState } from "root-reducer"
import { importBookmarks } from "state/bookmarks/import"
import { TitleBar } from "./component"

export const TitleBarContainer = connect(
  (state: AppState) => ({
    importRunning: state.bookmarks.import.loading,
  }),
  { importBookmarks },
)(TitleBar)
