import { reducer } from "lib/reducer-builder"
import { createAction } from "redux-actions"

export interface BookmarksSearchState {
  searchTerm?: string
  selectedIndex?: number
}

export const setSearchTerm = createAction(
  "bookmarks/search/set-search-term",
  (term: string) => term,
)

export const initSearchState: BookmarksSearchState = {}

export const bookmarksSearchReducer = reducer(initSearchState)
  .addHandler(setSearchTerm, (state, { payload }) => ({
    ...state,
    searchTerm: payload!,
  }))
  .getReducer()
