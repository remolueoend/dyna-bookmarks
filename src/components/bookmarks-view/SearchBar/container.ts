import { connect } from "react-redux"
import { AppState } from "root-reducer"
import { setSearchTerm } from "state/bookmarks/search"
import { SearchBar } from "./component"

export const SearchBarContainer = connect(
  (state: AppState) => ({
    value: state.bookmarks.search.searchTerm || "",
  }),
  {
    onChange: setSearchTerm,
  },
)(SearchBar)
