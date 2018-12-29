import { TreeNode } from "lib/trees"
import { combineReducers } from "redux"
import { createAction } from "redux-actions"
import { reducer } from "../../lib/reducer-builder"
import { bookmarksSearchReducer, BookmarksSearchState } from "./search"
import { bookmarksTreeReducer, BookmarksTreeState } from "./tree"

export { fetchBookmarksHandler } from "./fetch-bookmarks"

export type BookmarksNode = TreeNode<{
  label: string
  href?: string
}>

export interface BookmarksDataState {
  rootNode: BookmarksNode | undefined
  nodeMap: BookmarksNode[] | undefined
  loading: boolean
  error?: string
}

export const initialDataState: BookmarksDataState = {
  loading: false,
  rootNode: undefined,
  nodeMap: undefined,
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

export interface BookmarksState {
  data: BookmarksDataState
  tree: BookmarksTreeState
  search: BookmarksSearchState
}

export const bookmarksReducer = combineReducers<BookmarksState>({
  data: bookmarksDataReducer,
  search: bookmarksSearchReducer,
  tree: bookmarksTreeReducer,
})
