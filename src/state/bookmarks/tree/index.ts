import { reducer } from "lib/reducer-builder"
import { NodeID } from "lib/trees"
import { remove, without } from "ramda"
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
export const changeNodeSelection = createAction(
  "tree/change-node-selection",
  (selectedNode: NodeID | undefined, expandedNodes: NodeID[]) => ({
    selectedNode,
    expandedNodes,
  }),
)

export const addExpandedNode = createAction(
  "tree/add-expanded-node",
  (nodeId: NodeID) => nodeId,
)
export const removeExpandedNode = createAction(
  "tree/remove-expanded-node",
  (nodeId: NodeID) => nodeId,
)

export const bookmarksTreeReducer = reducer(initTreeState)
  /**
   * Handler for updating the NodeID of the currently selected node.
   */
  .addHandler(changeNodeSelection, (state, { payload }) => ({
    ...state,
    ...payload,
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
  .addHandler(addExpandedNode, (state, { payload }) => ({
    ...state,
    expandedNodes: [...state.expandedNodes, payload!],
  }))
  .addHandler(removeExpandedNode, (state, { payload }) => ({
    ...state,
    expandedNodes: without([payload!], state.expandedNodes),
  }))
  .getReducer()
