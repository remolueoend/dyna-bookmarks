import { applyMiddleware, createStore as reduxCreateStore } from "redux"
import { importBookmarks, importBookmarksHandler } from "state/bookmarks/import"
import { createAsyncMiddleware } from "./lib/redux-async"
import { AppState, rootReducer } from "./root-reducer"
import { fetchBookmarks, fetchBookmarksHandler } from "./state/bookmarks/data"

export const createStore = (initialState?: AppState) =>
  reduxCreateStore(
    rootReducer,
    initialState,
    applyMiddleware(
      createAsyncMiddleware({
        [fetchBookmarks.toString()]: fetchBookmarksHandler,
        [importBookmarks.toString()]: importBookmarksHandler,
      }),
    ),
  )
