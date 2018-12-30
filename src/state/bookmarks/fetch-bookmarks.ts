import { NodeID, parseNodeContent, resolveNodes } from "lib/trees"
import { fetchBookmarks, updateBookmarks } from "."
import {
  fetchDocumentContent,
  FetchDocumentNode,
} from "../../api/fetch-document"
import { createAsyncHandlerFor } from "../../lib/redux-async"

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
    const { rootNode, nodeList } = resolveNodes(nodeMap, node => ({
      ...parseNodeContent(node),
    }))

    dispatch(updateBookmarks(rootNode, nodeList))
  },
)
