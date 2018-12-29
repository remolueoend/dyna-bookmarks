import { reducer } from "lib/reducer-builder"

export interface BookmarksSearchState {
  searchTerm?: string
  selectedIndex?: number
}

export const initState: BookmarksSearchState = {}

export const bookmarksSearchReducer = reducer(initState).getReducer()
