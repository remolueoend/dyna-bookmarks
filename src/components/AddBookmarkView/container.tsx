import { withCurrentTab } from "lib/with-current-tab"
import { connect } from "react-redux"
import { AppState } from "root-reducer"
import { addBookmark } from "state/bookmarks/data"
import { AddBookmarkView } from "./component"

export const AddBookmarkViewContainer = connect(
  ({  }: AppState) => ({}),
  { addBookmark },
)(withCurrentTab(AddBookmarkView))
