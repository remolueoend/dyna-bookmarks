import { FetchDocumentNode } from "api/fetch-document"
import { reducer } from "lib/reducer-builder"
import { NodeID } from "lib/trees"
import { map, when } from "ramda"
import { createAction } from "redux-actions"

export { fetchBookmarksHandler } from "./fetch-bookmarks"

export interface NewBookmarkData {
  title: string
  href: string
  parentId: NodeID
}

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
export const addBookmark = createAction(
  "bookmarks/save-bookmark",
  (data: NewBookmarkData) => data,
)
export const insertBookmark = createAction(
  "bookmarks/insert-bookmarkd",
  (bookmark: FetchDocumentNode) => bookmark,
)
export const addChildToBookmark = createAction(
  "bookmarks/addChildToBookmark",
  (args: { nodeId: NodeID; childId: NodeID }) => args,
)
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
  .addHandler(insertBookmark, (state, { payload }) => ({
    ...state,
    nodes: [...state.nodes, payload!],
  }))
  .addHandler(addChildToBookmark, (state, { payload }) => ({
    ...state,
    // see: https://goo.gl/wf1exh
    // adds the given childId to the children of the node with the given nodeId
    nodes: map(
      node =>
        when(
          n => n.id === payload!.nodeId,
          n => ({
            ...n,
            children: [...(n.children || []), payload!.childId],
          }),
          node,
        ),
      state.nodes,
    ),
  }))
  .getReducer()
