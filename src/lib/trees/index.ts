import { FetchDocumentNode } from "api/fetch-document"
import { filter } from "fuzzy"
import { Omit } from "lib/types"
import { flatten } from "ramda"
import { BookmarksNode } from "state/bookmarks/data"

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
  parentNode?: TreeNode<TData>
}
export type TreeNodeWithChildren<TData> = Omit<TreeNode<TData>, "children"> & {
  children: Array<TreeNode<TData>>
}

export type FlatNodeMap<TData> = Map<NodeID, TreeNode<TData>>

export const resolveNode = <TRaw, TData>(
  nodeId: NodeID,
  rawNodeMap: Map<NodeID, RawNode<TRaw>>,
  nodeMap: FlatNodeMap<TData>,
  mapData: (node: RawNode<TRaw>) => TData,
  parentNode?: TreeNode<TData>,
): TreeNode<TData> => {
  const rawNode = rawNodeMap.get(nodeId)
  if (!rawNode) {
    throw new Error(
      `[lib/trees/resolveNode]: Cannot find node with NodeID ${nodeId}`,
    )
  }
  const node: TreeNode<TData> = {
    id: rawNode.id,
    data: mapData(rawNode),
    parentNode,
    children: [],
  }

  const childNodes = (rawNode.children || []).map(childId =>
    nodeMap.has(childId)
      ? nodeMap.get(childId)!
      : resolveNode(childId, rawNodeMap, nodeMap, mapData, node),
  )
  node.children = childNodes

  nodeMap.set(node.id, node)

  return node
}

export const resolveNodes = <TRaw, TData>(
  nodeMap: Map<NodeID, RawNode<TRaw>>,
  mapData: (node: RawNode<TRaw>) => TData,
) => {
  const nodes = new Map<NodeID, TreeNode<TData>>()
  const rootNode = resolveNode("root", nodeMap, nodes, mapData)

  return {
    nodeList: Array.from(nodes.values()),
    rootNode,
  }
}

/**
 * Returs a subset of the given node map as an array of nodes, containing
 * all nodes matching the given search text.
 *
 * @param nodeList node map to search through.
 * @param searchText text to search for.
 */
export const searchTree = <TNodeData>(
  nodeList: Array<TreeNode<TNodeData>>,
  searchText: string,
  getSearchContent: (node: TreeNode<TNodeData>) => string,
) => {
  return filter(searchText, nodeList, {
    extract: node => getSearchContent(node),
  }).map(result => result.original)
}

/**
 * Returns if the given node has at least one child.
 *
 * @param node the parent node
 */
export const hasChildren = <TData>(
  node: TreeNode<TData>,
): node is TreeNodeWithChildren<TData> =>
  !!node.children && !!node.children.length

/**
 * Flattens a tree starting with the given root node and returns a flat array of nodes.
 *
 * @param rootNode the current root node to start with.
 * @param getChildren function returning all children of a given node.
 */
export const flattenTree = <TTree>(
  rootNode: TTree,
  getChildren: (node: TTree) => TTree[],
): TTree[] => [
  rootNode,
  ...flatten(
    getChildren(rootNode).map(child => flattenTree(child, getChildren)),
  ),
]

export const isValidUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url)
    return !!parsedUrl
  } catch (_) {
    return false
  }
}

const parseContentNodeRegex = /\[(.*)\]\((.*)\)/
export const parseNodeContent = (
  node: FetchDocumentNode,
): { label: string; href?: string } => {
  if (!parseContentNodeRegex.test(node.content)) {
    return { label: node.content }
  }
  const parsed = parseContentNodeRegex.exec(node.content)
  const [, label, href] = parsed! // use use RegExp:test above

  return {
    label,
    href: isValidUrl(href) ? href : undefined,
  }
}

/**
 * Returns a string array of path elements to the given node.
 *
 * @param node the node to get the path from.
 */
export const getBookmarkPath = (node: BookmarksNode) =>
  getParentNodes(node).map(n => n.data.label)

/**
 * Returns an ascending list of all parent nodes of the given node.
 *
 * @param node The node to get the list of parent from.
 */
export const getParentNodes = <TData>(
  node: TreeNode<TData>,
): Array<TreeNode<TData>> =>
  node.parentNode ? [...getParentNodes(node.parentNode), node.parentNode] : []
