import { connect } from "react-redux"
import { AppState } from "root-reducer"
import {
  rootNodeSelector,
  selectedNodeSelector,
} from "state/bookmarks/data/tree-selectors"
import { addExpandedNode, removeExpandedNode } from "state/bookmarks/tree"
import { BookmarkTree } from "./component"

export const BookmarkTreeContainer = connect(
  (state: AppState) => ({
    rootNode: rootNodeSelector(state),
    expandedNodes: state.bookmarks.tree.expandedNodes,
    selectedNode: selectedNodeSelector(state),
  }),
  {
    addExpandedNode,
    removeExpandedNode,
  },
)(BookmarkTree)
