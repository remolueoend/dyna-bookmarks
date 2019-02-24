import { FetchDocumentNode } from "api/fetch-document"
import { filter } from "fuzzy"
import { Queue } from "lib/queue"
import { reverse } from "ramda"
import { BookmarksNode } from "state/bookmarks/data"
import { NodeRef } from "./node-ref"

/**
 * Represents the ID of a node.
 */
export type NodeID = string

/**
 * Describes a raw node without resolved child nodes.
 * The generic type `T` allows extending the basic type `RawNode` with additional properties.
 */
export type RawNode<T> = T & {
  id: NodeID
  children?: NodeID[]
}

/**
 * Describes a generic node with resolved references to its children.
 * The generic type `T` defines the type of data contained by a node.
 */
export interface TreeNode<TData> {
  id: NodeID
  children?: Array<TreeNode<TData>>
  data: TData
}

/**
 * Describes a map of node IDs to node instances.
 */
export type FlatNodeMap<TData> = Map<NodeID, NodeRef<TData>>

/**
 * Resolves a subtree of the given node ID. Uses `rawNodeMap` as source of raw node data,
 * `nodeMap` as cache of resolved node instances and `mapData` to construct the node's data structure.
 *
 * @param nodeId The ID of the node to resolve.
 * @param rawNodeMap A map containing all raw node data.
 * @param nodeMap A map holding already resolved node instances to reuse.
 * @param [parentPath] Node path of the parent of the node with the given ID.
 */
export const resolveNode = <TRaw, TData>(
  nodeId: NodeID,
  rawNodeMap: Map<NodeID, RawNode<TRaw>>,
  nodeMap: FlatNodeMap<TData>,
  mapData: (node: RawNode<TRaw>) => TData,
  parentNodePath: Array<TreeNode<TData>> = [],
): NodeRef<TData> => {
  // get the data of the current node and throw if not available:
  const rawNode = rawNodeMap.get(nodeId)
  if (!rawNode) {
    throw new Error(
      `[lib/trees/resolveNode]: Cannot find node with NodeID ${nodeId}`,
    )
  }

  // construct new node instance without any children:
  const node: TreeNode<TData> = {
    id: rawNode.id,
    data: mapData(rawNode),
    children: [],
  }

  const nodePath = [node, ...parentNodePath]

  // resolve children of current node recursively or reuse existing instances
  // cached in `nodeMap`:
  const childNodes = (rawNode.children || []).map(childId =>
    nodeMap.has(childId)
      ? nodeMap.get(childId)!
      : resolveNode(childId, rawNodeMap, nodeMap, mapData, nodePath),
  )
  node.children = childNodes

  const nodeRef = new NodeRef(nodePath)
  nodeMap.set(node.id, nodeRef)

  return nodeRef
}

/**
 * Resolves a tree structure from the given map of tree nodes.
 * Uses the provided `mapData` function to construct the data property of each node.
 *
 * @param nodeMap A map of nodes used as source to build the tree.
 * @param mapData Function accpeting a node and returning the data for a tree node.
 */
export const resolveNodes = <TRaw, TData>(
  nodeMap: Map<NodeID, RawNode<TRaw>>,
  mapData: (node: RawNode<TRaw>) => TData,
) => {
  const nodes = new Map<NodeID, NodeRef<TData>>()
  const root = resolveNode("root", nodeMap, nodes, mapData)
  return [root, nodes] as [typeof root, typeof nodes]
}

/**
 * Returs a subset of the given node map as an array of nodes, containing
 * all nodes matching the given search text.
 *
 * @param nodeList node map to search through.
 * @param searchText text to search for.
 */
export const searchTree = <TTreeNode>(
  nodeList: TTreeNode[],
  searchText: string,
  getSearchContent: (node: TTreeNode) => string,
) => {
  return filter(searchText, nodeList, {
    extract: getSearchContent,
  }).map(result => result.original)
}

/**
 * Flattens a tree breath-first starting with the given root node and returns a flat array of nodes.
 *
 * @param rootNode the current root node to start with.
 * @param getChildren function returning all children of a given node.
 */
export const flattenTree = <TTree>(
  rootNode: TTree,
  getChildren: (node: TTree) => TTree[],
): TTree[] => {
  const nodeQueue = new Queue<TTree>(rootNode)
  const result: TTree[] = []
  while (!nodeQueue.isEmpty()) {
    const current = nodeQueue.dequeue()
    nodeQueue.enqueue(...getChildren(current))
    result.push(current)
  }

  return result
}

/**
 * Returns whether the given string is a valid url.
 * Makes use of the browser's URL constructor.
 *
 * @param url string to validate
 */
export const isValidUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url)
    return !!parsedUrl
  } catch (_) {
    return false
  }
}

/**
 * Regex used to parse the content of a dynalist document node for markdown url patterns.
 */
const parseContentNodeRegex = /\[(.*)\]\((.*)\)/
/**
 * Returns a label and optionally a href (url) parsed from the given node's content.
 *
 * @param node The node to parse.
 */
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
 * Returns a string array of all labels of the given node's path, excluding the node itself.
 *
 * @param node the node to get the path from.
 */
export const getBookmarkPath = (node: BookmarksNode) =>
  reverse(node.path).map(n => n.data.label)
