import { FetchDocumentNode } from "api/fetch-document"
import {
  BookmarksNode,
  getBookmarkPath,
  NodeID,
  ParsedTreeInfo,
  searchTree,
} from "lib/trees"
import { createSelector } from "reselect"
import { AppState } from "root-reducer"
import { resolveFetchedNodes } from "./fetch-bookmarks"

const EMPTY_RESULTS: BookmarksNode[] = []

/**
 * Global reselect selector returning parsed node tree infos
 * from a given redux state.
 */
export const parsedTreeInfoSelector = createSelector<
  AppState,
  FetchDocumentNode[],
  ParsedTreeInfo
>(
  state => state.bookmarks.data.nodes,
  nodes => (nodes.length ? resolveFetchedNodes(nodes) : [undefined, new Map()]),
)

/**
 * Global reselect selector returning the instance of the root NodeRef
 * from the given redux state.
 */
export const rootNodeSelector = createSelector<
  AppState,
  ParsedTreeInfo,
  BookmarksNode | undefined
>(
  parsedTreeInfoSelector,
  ([rootNode]) => rootNode,
)

/**
 * Global reselect selector returning the instance of the currently
 * selected NodeRef from the given redux state.
 * Depends on `treeSelector`.
 */
export const selectedNodeSelector = createSelector<
  AppState,
  NodeID | undefined,
  ParsedTreeInfo,
  BookmarksNode | undefined
>(
  state => state.bookmarks.tree.selectedNode,
  parsedTreeInfoSelector,
  (selectedNodeID, [_, nodeMap]) =>
    selectedNodeID ? nodeMap.get(selectedNodeID) : undefined,
)

/**
 * Global reselect selector returning a flat list of bookmarks nodes
 * for the given redux state.
 * Returns an empty list if no nodes are loaded into the given state.
 */
export const flattedTreeSelector = createSelector<
  AppState,
  BookmarksNode | undefined,
  BookmarksNode[]
>(
  rootNodeSelector,
  rootNode => (rootNode ? rootNode.flatten() : []),
)

/**
 * Global reselect selector returning a search result in form of a
 * bookmark node array based on the given redux state.
 */
export const searchResultSelector = createSelector<
  AppState,
  boolean,
  string | undefined,
  BookmarksNode[],
  BookmarksNode[]
>(
  state => state.view.showLinksOnly,
  state => state.bookmarks.search.searchTerm,
  flattedTreeSelector,
  (showLinksOnly, searchTerm, nodes) => {
    const results =
      !searchTerm || !nodes.length
        ? EMPTY_RESULTS
        : searchTree(nodes, searchTerm, node => getBookmarkPath(node).join("/"))

    return !showLinksOnly ? results : results.filter(n => !!n.data.href)
  },
)

/**
 * Global reselect selector returning the instance of the currently selected node
 * in the search result view based on the given redux state.
 */
export const selectedSearchResultNodeSelector = createSelector<
  AppState,
  number,
  BookmarksNode[],
  BookmarksNode
>(
  state => state.bookmarks.search.selectedIndex,
  searchResultSelector,
  (selectedIndex, results) => results[selectedIndex],
)
