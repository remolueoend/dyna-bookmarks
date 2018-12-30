import { apiRequest } from "api/request"
import { ApiResponse } from "api/types"
import { NodeID } from "lib/trees"

// documentation of API /doc/edit: https://apidocs.dynalist.io/#make-change-to-the-content-of-a-document

export type DocumentChangeType = "insert" | "edit" | "move" | "delete"

export interface DocumentNodeChange<
  T extends DocumentChangeType = DocumentChangeType
> {
  action: T
}

export interface InsertNodeChange extends DocumentNodeChange<"insert"> {
  parent_id: NodeID
  index?: number
  content: string
  note?: string
  checked?: boolean
}

export interface EditNodeChange extends DocumentNodeChange<"edit"> {
  node_id: NodeID
  content?: string
  note?: string
  checked?: boolean
}

export interface MoveNodeChange extends DocumentNodeChange<"move"> {
  node_id: NodeID
  parent_id: NodeID
  /**
   * This field is an integer that's the zero-indexed position you want the file to land in the parent folder,
   * supply -1 to place it at the end, and 0 to place it at the top.
   */
  index: number
}

export interface DeleteNodeChange extends DocumentNodeChange<"delete"> {
  node_id: NodeID
}

export interface UpdateDocumentContentResponse extends ApiResponse {
  results: boolean[]
}

export type DocumentNodeChanges = Array<
  InsertNodeChange | EditNodeChange | MoveNodeChange | DeleteNodeChange
>

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
