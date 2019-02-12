import { fetchDocumentContent, FetchDocumentNode } from "api/fetch-document"
import { createAsyncHandlerFor } from "lib/redux-async"
import { NodeID, parseNodeContent, resolveNodes } from "lib/trees"
import { fetchBookmarks, updateBookmarks } from "."

export const resolveRawNodes = (nodeMap: Map<NodeID, FetchDocumentNode>) =>
  resolveNodes(nodeMap, node => parseNodeContent(node))

export const fetchBookmarksHandler = createAsyncHandlerFor(
  fetchBookmarks,
  async (_, dispatch) => {
    const documentContent = await fetchDocumentContent(
      process.env.DYNALIST_API_TOKEN || "",
      "EaD2w6adnlYW6Chvgiv6uElb",
    )

    const nodeMap = new Map(
      documentContent.nodes.map(
        node => [node.id, node] as [NodeID, FetchDocumentNode],
      ),
    )
    const rootNode = resolveRawNodes(nodeMap)

    dispatch(updateBookmarks(rootNode, rootNode.flatten()))
  },
)
