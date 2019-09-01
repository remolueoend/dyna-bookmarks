import { connect } from "react-redux"
import { AppState } from "root-reducer"
import { searchResultSelector } from "state/bookmarks/data/tree-selectors"
import { SearchResults } from "./component"

export const SearchResultsContainer = connect((state: AppState) => ({
  results: searchResultSelector(state),
  selectedIndex: state.bookmarks.search.selectedIndex || 0,
}))(SearchResults)
