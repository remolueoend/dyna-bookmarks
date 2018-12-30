import { connect } from "react-redux"
import { AppState } from "root-reducer"
import { BookmarksView } from "./component"

export const BookmarksViewContainer = connect(
  (state: AppState) => ({
    hasSearchTerm: !!state.bookmarks.search.searchTerm,
  }),
  {},
)(BookmarksView)
