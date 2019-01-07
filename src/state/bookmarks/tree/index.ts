import { reducer } from "lib/reducer-builder"
import { NodeID } from "lib/trees"
import { createAction } from "redux-actions"
import { BookmarksNode, updateBookmarks } from "../data"
import { MoveNodeSelectionDir, moveSelection } from "./move-selection"

export interface BookmarksTreeState {
  expandedNodes: NodeID[]
  selectedNode?: BookmarksNode
}

export const initTreeState: BookmarksTreeState = {
  expandedNodes: [],
}

export const moveNodeSelection = createAction(
  "tree/move-node-selection",
  (dir: MoveNodeSelectionDir) => dir,
)

export const bookmarksTreeReducer = reducer(initTreeState)
  .addHandler(moveNodeSelection, (state, { payload }) => ({
    ...state,
    ...moveSelection(state.selectedNode, state.expandedNodes, payload!),
  }))
  .addHandler(updateBookmarks, (state, { payload }) => ({
    ...state,
    selectedNode: payload!.rootNode.children![0],
  }))
  .getReducer()
