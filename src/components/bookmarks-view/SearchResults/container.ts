import { getBookmarkPath, searchTree } from "lib/trees"
import { connect } from "react-redux"
import { createSelector } from "reselect"
import { AppState } from "root-reducer"
import { BookmarksNode } from "state/bookmarks/data"
import { SearchResults } from "./component"

const searchResultsSelector = createSelector<
  AppState,
  string | undefined,
  BookmarksNode[] | undefined,
  boolean,
  BookmarksNode[]
>(
  state => state.bookmarks.search.searchTerm,
  state => state.bookmarks.data.nodeList,
  state => state.view.showLinksOnly,
  (searchTerm, nodeList, showLinksOnly) => {
    const results =
      !searchTerm || !nodeList
        ? []
        : searchTree(nodeList || [], searchTerm, node =>
            [...getBookmarkPath(node), node.data.label].join("/"),
          )
    return !showLinksOnly ? results : results.filter(n => !!n.data.href)
  },
)

export const SearchResultsContainer = connect((state: AppState) => ({
  results: searchResultsSelector(state),
  selectedIndex: state.bookmarks.search.selectedIndex || 0,
}))(SearchResults)
