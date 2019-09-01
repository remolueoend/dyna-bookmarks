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
import { importBookmarks, importBookmarksFinished } from "."
import { fetchBookmarks } from "../data"

/**
 * Async handler importing the browser's bookmark tree to dynalist.
 */
export const importBookmarksHandler = createAsyncHandlerFor(
  importBookmarks,
  async (_, dispatch) => {
    try {
      // get browser bookmark tree and flatten it:
      const bookmarksTree = await browser.bookmarks.getTree()
      const browserNodeList = flattenTree(
        bookmarksTree[0],
        node => node.children || [],
        // we want to ignore the root of browser bookmarks:
      ).filter(node => !!node.parentId)

      const fileId = "EaD2w6adnlYW6Chvgiv6uElb"
      const token = process.env.DYNALIST_API_TOKEN || ""

      // fetch the current bookmarks from dynalist so that we can delete them all:
      const currentBookmarks = await fetchDocumentContent(token, fileId)

      // tslint:disable:no-object-literal-type-assertion
      const insertChanges: DocumentNodeChanges = [
        // delete current bookmarks from dynalist except root node:
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
        // insert new node for each browser bookmark without nesting them yet:
        ...browserNodeList.map(
          node =>
            ({
              action: "insert",
              content:
                node.type === "bookmark"
                  ? `[${node.title}](${node.url})`
                  : node.title,
              parent_id: "root",
            } as InsertNodeChange),
        ),
      ]

      const flatInsertResult = await updateDocumentContent(
        token,
        fileId,
        insertChanges,
      )

      // maps browser bookmark node IDs to their dynalist node IDs:
      const resolveDynaNodeIdMap = new Map(
        browserNodeList.map(
          (browserNode, i) =>
            [browserNode.id, flatInsertResult.new_node_ids[i]] as [
              string,
              NodeID
            ],
        ),
      )

      // move each node under its parent:
      const moveChanges: DocumentNodeChanges = browserNodeList
        // do not move nodes which have no parent, ie. are located directly under the root node
        // which was not sent to dynalist (see above):
        .filter(
          node => !!node.parentId && resolveDynaNodeIdMap.has(node.parentId),
        )
        .map(browserNode => ({
          action: "move" as "move",
          node_id: resolveDynaNodeIdMap.get(browserNode.id)!,
          parent_id: resolveDynaNodeIdMap.get(browserNode.parentId!)!,
          index: -1,
        }))

      await updateDocumentContent(token, fileId, moveChanges)

      dispatch(fetchBookmarks())
      dispatch(importBookmarksFinished())
    } catch (err) {
      dispatch(importBookmarksFinished())
      // tslint:disable:no-console
      alert(`Failed to import bookmarks: ${err.message}`)
    }
  },
)
