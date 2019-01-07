import { connect } from "react-redux"
import { AppState } from "root-reducer"
import { moveResultSelection, setSearchTerm } from "state/bookmarks/search"
import { moveNodeSelection } from "state/bookmarks/tree"
import { SearchBar } from "./component"

export const SearchBarContainer = connect(
  (state: AppState) => ({
    value: state.bookmarks.search.searchTerm || "",
  }),
  {
    onChange: setSearchTerm,
    moveNodeSelection,
    moveResultSelection,
  },
)(SearchBar)
