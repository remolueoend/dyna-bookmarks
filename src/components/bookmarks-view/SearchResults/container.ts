import { searchTree } from "lib/trees"
import { connect } from "react-redux"
import { createSelector } from "reselect"
import { AppState } from "root-reducer"
import { BookmarksNode } from "state/bookmarks"
import { SearchResults } from "./component"

const searchResultsSelector = createSelector<
  AppState,
  string | undefined,
  BookmarksNode[] | undefined,
  BookmarksNode[]
>(
  state => state.bookmarks.search.searchTerm,
  state => state.bookmarks.data.nodeMap,
  (searchTerm, nodeList) =>
    !searchTerm || !nodeList
      ? []
      : searchTree(nodeList || [], searchTerm, node => [
          ...node.path,
          node.data.label,
          ...(node.data.href ? [node.data.href] : []),
        ]),
)

export const SearchResultsContainer = connect((state: AppState) => ({
  results: searchResultsSelector(state),
  selectedIndex: state.bookmarks.search.selectedIndex || 0,
}))(SearchResults)
