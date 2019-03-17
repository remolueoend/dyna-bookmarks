import { insertNodeChange, updateDocumentContent } from "api/update-document"
import { getMarkdownLinkText } from "lib/markdown"
import { createAsyncHandlerFor } from "lib/redux-async"
import { addBookmark, addChildToBookmark, insertBookmark } from "."

/**
 * Async action handler posting the new node data given as payload to the dynalist API.
 * After the new node was craeted, this handler updates the bookmark data state by adding the new now
 * and updating the children of its parent node.
 */
export const addBookmarkHandler = createAsyncHandlerFor(
  addBookmark,
  async ({ payload }, dispatch) => {
    const nodeContent = getMarkdownLinkText({
      label: payload!.title,
      href: payload!.href,
    })
    const parentId = payload!.parentId

    // post to dynalist API
    const result = await updateDocumentContent(
      process.env.DYNALIST_API_TOKEN || "",
      "EaD2w6adnlYW6Chvgiv6uElb",
      [
        insertNodeChange({
          content: nodeContent,
          parent_id: parentId,
        }),
      ],
    )
    const newNodeId = result.new_node_ids[0]
    if (!newNodeId) {
      throw new Error(
        "[state/bookmarks/data/addBookmark]: The response did not contain the newtly created node ID",
      )
    }

    // add new node to bookmark data state:
    dispatch(
      insertBookmark({
        id: newNodeId,
        content: nodeContent,
        children: [],
        checked: false,
      }),
    )
    // udpate children of new node's parent:
    dispatch(addChildToBookmark({ nodeId: parentId, childId: newNodeId }))
  },
)
