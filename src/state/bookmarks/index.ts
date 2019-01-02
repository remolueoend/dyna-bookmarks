import { TreeNode } from "lib/trees"
import { combineReducers } from "redux"
import { bookmarksDataReducer, BookmarksDataState } from "./data"
import { bookmarksImportReducer, BookmarksImportState } from "./import"
import { bookmarksSearchReducer, BookmarksSearchState } from "./search"
import { bookmarksTreeReducer, BookmarksTreeState } from "./tree"

export interface BookmarksState {
  data: BookmarksDataState
  tree: BookmarksTreeState
  search: BookmarksSearchState
  import: BookmarksImportState
}

export const bookmarksReducer = combineReducers<BookmarksState>({
  data: bookmarksDataReducer,
  search: bookmarksSearchReducer,
  tree: bookmarksTreeReducer,
  import: bookmarksImportReducer,
})
