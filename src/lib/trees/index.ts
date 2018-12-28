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

export const resolveNode = <TRaw, TData>(
  nodeId: NodeID,
  path: string[],
  rawNodeMap: Map<NodeID, RawNode<TRaw>>,
  nodeMap: FlatNodeMap<TData>,
  mapData: (node: RawNode<TRaw>) => TData,
): TreeNode<TData> => {
  const rawNode = rawNodeMap.get(nodeId)
  if (!rawNode) {
    throw new Error(
      `[lib/trees/resolveNode]: Cannot find node with NodeID ${nodeId}`,
    )
  }
  const childNodes = (rawNode.children || []).map(childId =>
    nodeMap.has(childId)
      ? nodeMap.get(childId)!
      : resolveNode(
          childId,
          [...path, rawNode.text],
          rawNodeMap,
          nodeMap,
          mapData,
        ),
  )

  const node = {
    id: rawNode.id,
    children: childNodes,
    path,
    data: mapData(rawNode),
  }

  nodeMap.set(node.id, node)

  return node
}

export const resolveNodes = <TRaw, TData>(
  nodeMap: Map<NodeID, RawNode<TRaw>>,
  mapData: (node: RawNode<TRaw>) => TData,
) => {
  const nodes = new Map<NodeID, TreeNode<TData>>()
  const rootNode = resolveNode("root", [], nodeMap, nodes, mapData)

  return {
    nodeList: Array.from(nodes.values()),
    rootNode,
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
