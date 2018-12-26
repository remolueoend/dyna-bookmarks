import { createAction } from "redux-actions"
import { NodeID } from "../../api/types"
import { reducer } from "../../lib/reducer-builder"

export { fetchBookmarksHandler } from "./fetch-bookmarks"

export interface BookmarksNode {
  children?: BookmarksNode[]
  content: string
  id: NodeID
}

export interface BookmarksState {
  root: BookmarksNode | undefined
  loading: boolean
  error?: string
}

export const initialState: BookmarksState = {
  loading: false,
  root: undefined,
}

export const fetchBookmarks = createAction("fetch-bookmarks")
export const updateBookmarks = createAction(
  "update-bookmarks",
  (rootNode: BookmarksNode) => rootNode,
)
export const setBookmarksError = createAction(
  "set-bookmarks-error",
  (error: string) => error,
)

export const bookmarksReducer = reducer(initialState)
  .addHandler(fetchBookmarks, state => ({
    ...state,
    loading: true,
    error: undefined,
  }))
  .addHandler(updateBookmarks, (state, { payload }) => ({
    ...state,
    loading: false,
    root: payload!,
    error: undefined,
  }))
  .addHandler(setBookmarksError, (state, { payload }) => ({
    ...state,
    loading: false,
    children: [],
    error: payload!,
  }))
  .getReducer()
