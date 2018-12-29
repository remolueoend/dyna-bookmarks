import { connect } from "react-redux"
import { AppState } from "root-reducer"
import { SearchBar } from "./component"

export const SearchBarContainer = connect((state: AppState) => ({
  value: state.bookmarks.search.searchTerm || "",
}))(SearchBar)
