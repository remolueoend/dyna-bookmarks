import { combineReducers } from "redux"
import { AppState } from "../redux/state"
import { bookmarksReducer } from "../state/bookmarks"

export const rootReducer = combineReducers<AppState>({
  bookmarks: bookmarksReducer,
})
