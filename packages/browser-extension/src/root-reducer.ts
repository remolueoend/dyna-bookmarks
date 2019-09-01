import { combineReducers } from "redux"
import { ViewState, viewStateReducer } from "state/view"
import { bookmarksReducer, BookmarksState } from "./state/bookmarks"

export interface AppState {
  bookmarks: BookmarksState
  view: ViewState
}

export const rootReducer = combineReducers<AppState>({
  bookmarks: bookmarksReducer,
  view: viewStateReducer,
})
