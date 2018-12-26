import { BookmarksNode, updateBookmarks } from "."
import {
  fetchDocumentContent,
  FetchDocumentNode,
} from "../../api/fetch-document"
import { AsyncFunctionHandler } from "../../lib/redux-async"
import { AppState } from "../../redux/state"

export const buildNodeTree = (
  nodeMap: Map<string, FetchDocumentNode>,
  nodeId: string,
): BookmarksNode => {
  const fetchedNode = nodeMap.get(nodeId)
  if (!fetchedNode) {
    throw new Error(`Could not find a node with id ${nodeId}`)
  }
  return {
    id: fetchedNode.id,
    content: fetchedNode.content,
    children: (fetchedNode.children || []).map(childId =>
      buildNodeTree(nodeMap, childId),
    ),
  }
}

export const fetchBookmarksHandler: AsyncFunctionHandler<AppState> = async (
  _,
  dispatch,
) => {
  const documentContent = await fetchDocumentContent(
    "V-81Znq_V12XamdPABg19psBuVOZtQhh4yXsnsx2HWADYtVx7Qk3vl_hRAVolrGXW1kqkGiqSmw8pCtmoUm2XxRqPic7E36dTSZeCaZ44koxOxWTMvJNCYzun2C9pYKp",
    "EaD2w6adnlYW6Chvgiv6uElb",
  )

  const nodeMap = new Map(
    documentContent.nodes.map(
      node => [node.id, node] as [string, FetchDocumentNode],
    ),
  )
  const rootNode = buildNodeTree(nodeMap, "root")

  dispatch(updateBookmarks(rootNode))
}
