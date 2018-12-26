import { applyMiddleware, createStore } from "redux"
import { createAsyncMiddleware } from "../lib/redux-async"
import { fetchBookmarks, fetchBookmarksHandler } from "../state/bookmarks"
import { rootReducer } from "./root-reducer"

export const store = createStore(
  rootReducer,
  applyMiddleware(
    createAsyncMiddleware({
      [fetchBookmarks.toString()]: fetchBookmarksHandler,
    }),
  ),
)
