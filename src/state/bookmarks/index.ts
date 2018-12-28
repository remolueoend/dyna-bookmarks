import { TreeNode } from "lib/trees"
import { createAction } from "redux-actions"
import { reducer } from "../../lib/reducer-builder"

export { fetchBookmarksHandler } from "./fetch-bookmarks"

export type BookmarksNode = TreeNode<{
  content: string
}>

export interface BookmarksState {
  rootNode: BookmarksNode | undefined
  nodeMap: BookmarksNode[] | undefined
  loading: boolean
  error?: string
}

export const initialState: BookmarksState = {
  loading: false,
  rootNode: undefined,
  nodeMap: undefined,
}

export const fetchBookmarks = createAction("fetch-bookmarks")
export const updateBookmarks = createAction(
  "update-bookmarks",
  (rootNode: BookmarksNode, nodeList: BookmarksNode[]) => ({
    rootNode,
    nodeList,
  }),
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
    rootNode: payload!.rootNode,
    nodeMap: payload!.nodeList,
    error: undefined,
  }))
  .addHandler(setBookmarksError, (state, { payload }) => ({
    ...state,
    loading: false,
    children: [],
    error: payload!,
  }))
  .getReducer()
