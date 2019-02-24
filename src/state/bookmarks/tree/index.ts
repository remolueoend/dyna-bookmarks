import { reducer } from "lib/reducer-builder"
import { NodeID } from "lib/trees"
import { createAction } from "redux-actions"
import { updateBookmarks } from "../data"

export interface BookmarksTreeState {
  expandedNodes: NodeID[]
  selectedNode?: NodeID
}

export const initTreeState: BookmarksTreeState = {
  expandedNodes: [],
}

/**
 * Action to manipulate the current selected node.
 * Expects the NodeID of the newly selected node as payload.
 */
export const moveNodeSelection = createAction(
  "tree/move-node-selection",
  (newSelectedId: NodeID) => newSelectedId,
)

export const bookmarksTreeReducer = reducer(initTreeState)
  /**
   * Handler for updating the NodeID of the currently selected node.
   */
  .addHandler(moveNodeSelection, (state, { payload }) => ({
    ...state,
    selectedNode: payload!,
  }))
  /**
   * Handler setting the currently selected node to the ID of the first child
   * when ever the nodes are updated.
   */
  .addHandler(updateBookmarks, (state, { payload }) => ({
    ...state,
    // move selection to first child of root as soon as nodes are updated:
    selectedNode:
      payload![0] && payload![0].children && payload![0].children![0],
  }))
  .getReducer()
