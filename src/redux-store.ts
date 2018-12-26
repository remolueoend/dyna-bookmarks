import { applyMiddleware, createStore } from "redux"
import { createAsyncMiddleware } from "./lib/redux-async"
import { rootReducer } from "./root-reducer"
import { fetchBookmarks, fetchBookmarksHandler } from "./state/bookmarks"

export const store = createStore(
  rootReducer,
  applyMiddleware(
    createAsyncMiddleware({
      [fetchBookmarks.toString()]: fetchBookmarksHandler,
    }),
  ),
)
