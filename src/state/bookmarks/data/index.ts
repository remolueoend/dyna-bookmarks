import { reducer } from "lib/reducer-builder"
import { NodeRef } from "lib/trees/node-ref"
import { createAction } from "redux-actions"

export { fetchBookmarksHandler } from "./fetch-bookmarks"

export interface BookmarkNodeData {
  label: string
  href?: string
}

export type BookmarksNode = NodeRef<BookmarkNodeData>

export interface BookmarksDataState {
  rootNode: BookmarksNode | undefined
  nodeList: BookmarksNode[] | undefined
  loading: boolean
  error?: string
}

export const initialDataState: BookmarksDataState = {
  loading: false,
  rootNode: undefined,
  nodeList: undefined,
}

export const fetchBookmarks = createAction("bookmarks/fetch-bookmarks")
export const updateBookmarks = createAction(
  "bookmarks/update-bookmarks",
  (rootNode: BookmarksNode, nodeList: BookmarksNode[]) => ({
    rootNode,
    nodeList,
  }),
)
export const setBookmarksError = createAction(
  "bookmarks/set-bookmarks-error",
  (error: string) => error,
)

export const bookmarksDataReducer = reducer(initialDataState)
  .addHandler(fetchBookmarks, state => ({
    ...state,
    loading: true,
    error: undefined,
  }))
  .addHandler(updateBookmarks, (state, { payload }) => ({
    ...state,
    loading: false,
    rootNode: payload!.rootNode,
    nodeList: payload!.nodeList,
    error: undefined,
  }))
  .addHandler(setBookmarksError, (state, { payload }) => ({
    ...state,
    loading: false,
    children: [],
    error: payload!,
  }))
  .getReducer()
