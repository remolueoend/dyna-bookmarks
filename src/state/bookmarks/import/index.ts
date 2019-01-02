import { reducer } from "lib/reducer-builder"
import { createAction } from "redux-actions"

export { importBookmarksHandler } from "./import-bookmarks"

export interface BookmarksImportState {
  loading: boolean
}

export const bookmarksImportInitState: BookmarksImportState = {
  loading: false,
}

export const importBookmarks = createAction("bookmarks/import-bookmarks")
export const importBookmarksFinished = createAction(
  "bookmarks/import-bookmarks/finished",
)

export const bookmarksImportReducer = reducer(bookmarksImportInitState)
  .addHandler(importBookmarks, state => ({
    ...state,
    loading: true,
  }))
  .addHandler(importBookmarksFinished, state => ({
    ...state,
    loading: false,
  }))
  .getReducer()
