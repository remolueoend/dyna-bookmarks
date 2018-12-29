import { connect } from "react-redux"
import { AppState } from "root-reducer"
import { BookmarkTree } from "./component"

export const BookmarkTreeContainer = connect((state: AppState) => ({
  rootNode: state.bookmarks.data.rootNode,
  expandedNodes: state.bookmarks.tree.expandedNodes,
  selectedNode: state.bookmarks.tree.selectedNode,
}))(BookmarkTree)
