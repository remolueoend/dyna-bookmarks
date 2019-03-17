import { apiRequest } from "api/request"
import { ApiResponse } from "api/types"
import { NodeID } from "lib/trees"
import { Omit } from "ramda"

// documentation of API /doc/edit: https://apidocs.dynalist.io/#make-change-to-the-content-of-a-document

/**
 * The type of change to apply to a node.
 */
export type NodeChangeType = "insert" | "edit" | "move" | "delete"

/**
 * Base type of all possible node changes. Defines a property `action` whose
 * value corresponds to the generic type `T`.
 *
 * @template T The generic type of node change. Must by a subset of `NodeChangeType`.
 */
export interface DocumentNodeChange<T extends NodeChangeType = NodeChangeType> {
  action: T
}

/**
 * Describes an insert change, ie. adding a new node to document.
 */
export interface InsertNodeChange extends DocumentNodeChange<"insert"> {
  parent_id: NodeID
  index?: number
  content: string
  note?: string
  checked?: boolean
}

/**
 * Describes an edit change, ie. editing an existing node in a document.
 */
export interface EditNodeChange extends DocumentNodeChange<"edit"> {
  node_id: NodeID
  content?: string
  note?: string
  checked?: boolean
}

/**
 * Describes a move change, ie. moving an existing node to a new parent in the same document.
 */
export interface MoveNodeChange extends DocumentNodeChange<"move"> {
  node_id: NodeID
  parent_id: NodeID
  /**
   * This field is an integer that's the zero-indexed position you want the file to land in the parent folder,
   * supply -1 to place it at the end, and 0 to place it at the top.
   */
  index: number
}

/**
 * Describes a delete change, ie. deleting an exising node in a document.
 */
export interface DeleteNodeChange extends DocumentNodeChange<"delete"> {
  node_id: NodeID
}

/**
 * Union type of all possible node changes.
 */
export type DocumentNodeChanges = Array<
  InsertNodeChange | EditNodeChange | MoveNodeChange | DeleteNodeChange
>

/**
 * Describes the dynalist API response of a document update request.
 */
export interface UpdateDocumentContentResponse extends ApiResponse {
  new_node_ids: NodeID[]
}

/**
 * sends an update request to dynalist api for the given file id using the given token and
 * provided list of changes.
 *
 * @param token api token
 * @param fileId id of the file to update
 * @param changes changes to send to the server.
 */
export const updateDocumentContent = async (
  token: string,
  fileId: string,
  changes: DocumentNodeChange[],
) =>
  apiRequest<UpdateDocumentContentResponse>("/doc/edit", token, {
    file_id: fileId,
    changes,
  })

export const insertNodeChange = (
  data: Omit<InsertNodeChange, "action">,
): InsertNodeChange => ({
  ...data,
  action: "insert",
})
