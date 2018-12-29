import { NodeID, resolveNodes } from "lib/trees"
import { updateBookmarks } from "."
import {
  fetchDocumentContent,
  FetchDocumentNode,
} from "../../api/fetch-document"
import { AsyncActionHandler } from "../../lib/redux-async"
import { AppState } from "../../root-reducer"

export const fetchBookmarksHandler: AsyncActionHandler<AppState> = async (
  _,
  dispatch,
) => {
  const documentContent = await fetchDocumentContent(
    "V-81Znq_V12XamdPABg19psBuVOZtQhh4yXsnsx2HWADYtVx7Qk3vl_hRAVolrGXW1kqkGiqSmw8pCtmoUm2XxRqPic7E36dTSZeCaZ44koxOxWTMvJNCYzun2C9pYKp",
    "EaD2w6adnlYW6Chvgiv6uElb",
  )

  const nodeMap = new Map(
    documentContent.nodes.map(
      node => [node.id, node] as [NodeID, FetchDocumentNode],
    ),
  )
  const { rootNode, nodeList } = resolveNodes(nodeMap, node => ({
    label: node.content,
  }))

  dispatch(updateBookmarks(rootNode, nodeList))
}
