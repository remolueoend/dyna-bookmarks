import { FetchDocumentNode } from "api/fetch-document"
import { reducer } from "lib/reducer-builder"
import { NodeID } from "lib/trees"
import { NodeRef } from "lib/trees/node-ref"
import { createAction } from "redux-actions"

export { fetchBookmarksHandler } from "./fetch-bookmarks"

export interface BookmarkNodeData {
  label: string
  href?: string
}

export type BookmarksNode = NodeRef<BookmarkNodeData>
export type BookmarksNodeMap = Map<NodeID, BookmarksNode>
export type ParsedTreeInfo = [BookmarksNode | undefined, BookmarksNodeMap]

export interface BookmarksDataState {
  nodes: FetchDocumentNode[]
  loading: boolean
  error?: string
}

export const initialDataState: BookmarksDataState = {
  loading: false,
  nodes: [],
}

export const fetchBookmarks = createAction("bookmarks/fetch-bookmarks")
export const updateBookmarks = createAction(
  "bookmarks/update-bookmarks",
  (nodes: FetchDocumentNode[]) => nodes,
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
    nodes: payload!,
    error: undefined,
  }))
  .addHandler(setBookmarksError, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload!,
  }))
  .getReducer()
