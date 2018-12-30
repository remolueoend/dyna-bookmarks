import { fetchDocumentContent, FetchDocumentNode } from "api/fetch-document"
import {
  DeleteNodeChange,
  DocumentNodeChanges,
  EditNodeChange,
  InsertNodeChange,
  MoveNodeChange,
  updateDocumentContent,
} from "api/update-document"
import { createAsyncHandlerFor } from "lib/redux-async"
import { flattenTree, NodeID } from "lib/trees"
import { createAction } from "redux-actions"
import { fetchBookmarks } from ".."

export const importBookmarks = createAction("bookmarks/import-bookmarks")

export const importBookmarksHandler = createAsyncHandlerFor(
  importBookmarks,
  async (_, dispatch) => {
    const bookmarksTree = await browser.bookmarks.getTree()
    const browserNodeList = flattenTree(
      bookmarksTree[0],
      node => node.children || [],
    )

    const fileId = "EaD2w6adnlYW6Chvgiv6uElb"
    const token = process.env.DYNALIST_API_TOKEN || ""

    const currentBookmarks = await fetchDocumentContent(token, fileId)

    // tslint:disable:no-object-literal-type-assertion
    const insertChanges: DocumentNodeChanges = [
      ...currentBookmarks.nodes
        // we do not want to delete the root of the dynalist document:
        .filter(node => node.id !== "root")
        .map(
          node =>
            ({
              action: "delete",
              node_id: node.id,
            } as DeleteNodeChange),
        ),
      ...browserNodeList
        // we want to ignore the root of browser bookmarks:
        .filter(node => !!node.parentId)
        .map(
          node =>
            ({
              action: "insert",
              content:
                node.type === "bookmark"
                  ? `[${node.title}](${node.url})`
                  : node.title,
              note: node.id,
              parent_id: "root",
            } as InsertNodeChange),
        ),
    ]
    await updateDocumentContent(token, fileId, insertChanges)
    const tempNodes = await fetchDocumentContent(token, fileId)
    const browserIdToDynaId = new Map(
      tempNodes.nodes.map(
        dynaNode => [dynaNode.note!, dynaNode.id] as [string, string],
      ),
    )
    const browserNodeIdMap = new Map(
      browserNodeList.map(
        node => [node.id, node] as [string, browser.bookmarks.BookmarkTreeNode],
      ),
    )

    const resolveParentId = (node: FetchDocumentNode): NodeID => {
      const browserId = node.note!
      const browserNode = browserNodeIdMap.get(browserId)!
      const browserParentId = browserNode.parentId
      if (!browserParentId) {
        return "root"
      }
      return browserIdToDynaId.get(browserParentId) || "root"
    }

    const moveChanges: DocumentNodeChanges = [
      ...tempNodes.nodes
        .filter(node => !!node.note)
        .map(
          dynaNode =>
            ({
              action: "move",
              node_id: dynaNode.id,
              parent_id: resolveParentId(dynaNode),
            } as MoveNodeChange),
        ),
      ...tempNodes.nodes.map(
        dynaNode =>
          ({
            action: "edit",
            node_id: dynaNode.id,
            note: "",
          } as EditNodeChange),
      ),
    ]

    await updateDocumentContent(token, fileId, moveChanges)

    dispatch(fetchBookmarks())
  },
)
