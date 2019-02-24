import { reducer } from "lib/reducer-builder"
import { createAction } from "redux-actions"

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
