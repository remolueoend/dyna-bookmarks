import { reducer } from "lib/reducer-builder"
import { getBookmarkPath, searchTree } from "lib/trees"
import { createAction } from "redux-actions"
import { createSelector } from "reselect"
import { AppState } from "root-reducer"
import { BookmarksNode } from "../data"

export interface BookmarksSearchState {
  searchTerm?: string
  selectedIndex: number
}

export const initSearchState: BookmarksSearchState = {
  selectedIndex: 0,
}

export const setSearchTerm = createAction(
  "bookmarks/search/set-search-term",
  (term: string) => term,
)
export const moveResultSelection = createAction(
  "bookmarks/serch/move-selection",
  (dir: "up" | "down") => dir,
)

export const searchResultsSelector = createSelector<
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

export const bookmarksSearchReducer = reducer(initSearchState)
  .addHandler(setSearchTerm, (state, { payload }) => ({
    ...state,
    searchTerm: payload!,
    selectedIndex: 0,
  }))
  .addHandler(moveResultSelection, (state, { payload }) => ({
    ...state,
    selectedIndex: state.selectedIndex + (payload === "down" ? 1 : -1),
  }))
  .getReducer()
