import { filter } from "fuzzy"
import { flatten, split } from "ramda"

export type NodeID = string

export type RawNode<T> = T & {
  id: NodeID
  children?: NodeID[]
  text: string
}

export interface TreeNode<TData> {
  id: NodeID
  children?: Array<TreeNode<TData>>
  data: TData
  path: string[]
}

export type FlatNodeMap<TData> = Map<NodeID, TreeNode<TData>>

/**
 * Builds a tree from the given flat node list and returns a new flat list of extended nodes.
 *
 * @param nodeMap flat node list
 * @param nodeId The node ID of the root
 * @param getSearchableContent: function accepting a node and returning a string array
 * of content included when searched through the tree
 * @param mapData function accepting a node and returning the new node data
 */
export const buildNodeTree = <TRaw, TData>(
  nodeMap: Map<NodeID, RawNode<TRaw>>,
  nodeId: NodeID,
  mapData: (node: RawNode<TRaw>) => TData,
): TreeNode<TData> => {
  const rootNode = nodeMap.get(nodeId)
  if (!rootNode) {
    throw new Error(
      `[lib/trees/buildNodeTree]: Could not find a node with id ${nodeId}`,
    )
  }
  return {
    id: rootNode.id,
    children: (rootNode.children || []).map(childId =>
      buildNodeTree(nodeMap, childId, mapData),
    ),
    path: [],
    data: mapData(rootNode),
  }
}

/**
 * Returs a subset of the given node map as an array of nodes, containing
 * all nodes matching the given search text.
 *
 * @param nodeMap node map to search through.
 * @param searchText text to search for.
 */
export const searchTree = <TNodeData>(
  nodeMap: FlatNodeMap<TNodeData>,
  searchText: string,
  getSearchContent: (node: TreeNode<TNodeData>) => string[],
) => {
  return filter(searchText, Array.from(nodeMap.values()), {
    extract: node => `${node.path.join("/")}/${getSearchContent(node)}`,
  }).map(result => result.original)
}
