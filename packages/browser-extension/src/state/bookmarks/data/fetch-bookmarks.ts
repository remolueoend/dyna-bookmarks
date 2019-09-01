import { fetchDocumentContent, FetchDocumentNode } from "api/fetch-document"
import { parseMarkdownLinkText } from "lib/markdown"
import { createAsyncHandlerFor } from "lib/redux-async"
import { NodeID, resolveNodes } from "lib/trees"
import { fetchBookmarks, updateBookmarks } from "."

/**
 * Returns a parsed node tree (root node ref) for the given list
 * of fetched raw nodes.
 *
 * @param fetchedNodes List of fetched nodes to parse.
 */
export const resolveFetchedNodes = (fetchedNodes: FetchDocumentNode[]) => {
  const nodeMap = new Map(
    fetchedNodes.map(node => [node.id, node] as [NodeID, FetchDocumentNode]),
  )

  if (!nodeMap.has("root")) {
    throw new Error(
      "[state/bookmarks/data/fetch-bookmarks:resolvedFetchedNodes]: No node with ID `root` given.",
    )
  }

  return resolveNodes(nodeMap, node => parseMarkdownLinkText(node.content))
}

/**
 * Async action handler fetching and loading nodes from dynalist into redux state.
 */
export const fetchBookmarksHandler = createAsyncHandlerFor(
  fetchBookmarks,
  async (_, dispatch) => {
    const documentContent = await fetchDocumentContent(
      process.env.DYNALIST_API_TOKEN || "",
      "EaD2w6adnlYW6Chvgiv6uElb",
    )

    dispatch(updateBookmarks(documentContent.nodes))
  },
)
