import { reducer } from "lib/reducer-builder"
import { createAction } from "redux-actions"
import { BookmarksNode } from ".."

export interface BookmarksSearchState {
  selectedResult?: BookmarksNode
}

export const initState: BookmarksSearchState = {}

export const bookmarksSearchReducer = reducer(initState).getReducer()
