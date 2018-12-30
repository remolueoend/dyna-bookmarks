import { reducer } from "lib/reducer-builder"
import { NodeID } from "lib/trees"

export interface BookmarksTreeState {
  expandedNodes: NodeID[]
  selectedNode?: NodeID
}

export const initTreeState: BookmarksTreeState = {
  expandedNodes: [],
}

export const bookmarksTreeReducer = reducer(initTreeState).getReducer()
