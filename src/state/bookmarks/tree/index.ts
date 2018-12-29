import { reducer } from "lib/reducer-builder"
import { NodeID } from "lib/trees"

export interface BookmarksTreeState {
  expandedNodes: NodeID[]
  selectedNode?: NodeID
}

export const initState: BookmarksTreeState = {
  expandedNodes: [],
}

export const bookmarksTreeReducer = reducer(initState).getReducer()
