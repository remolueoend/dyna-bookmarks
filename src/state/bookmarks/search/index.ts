import { reducer } from "lib/reducer-builder"

export interface BookmarksSearchState {
  searchTerm?: string
  selectedIndex?: number
}

export const initSearchState: BookmarksSearchState = {}

export const bookmarksSearchReducer = reducer(initSearchState).getReducer()
