import { combineReducers } from "redux"
import { bookmarksReducer, BookmarksState } from "./state/bookmarks"

export interface AppState {
  bookmarks: BookmarksState
}

export const rootReducer = combineReducers<AppState>({
  bookmarks: bookmarksReducer,
})
