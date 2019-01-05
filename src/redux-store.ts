import { applyMiddleware, createStore as reduxCreateStore } from "redux"
import { composeWithDevTools } from "remote-redux-devtools"
import { importBookmarks, importBookmarksHandler } from "state/bookmarks/import"
import { createAsyncMiddleware } from "./lib/redux-async"
import { AppState, rootReducer } from "./root-reducer"
import { fetchBookmarks, fetchBookmarksHandler } from "./state/bookmarks/data"

export const createStore = (initialState?: AppState) =>
  reduxCreateStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        createAsyncMiddleware({
          [fetchBookmarks.toString()]: fetchBookmarksHandler,
          [importBookmarks.toString()]: importBookmarksHandler,
        }),
      ),
    ),
  )
