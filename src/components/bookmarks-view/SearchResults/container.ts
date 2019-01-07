import { connect } from "react-redux"
import { AppState } from "root-reducer"
import { searchResultsSelector } from "state/bookmarks/search"
import { SearchResults } from "./component"

export const SearchResultsContainer = connect((state: AppState) => ({
  results: searchResultsSelector(state),
  selectedIndex: state.bookmarks.search.selectedIndex || 0,
}))(SearchResults)
