import { apiRequest } from "../request"
import { NodeID } from "../types"

export interface FetchDocumentNode {
  id: NodeID
  content: string
  note: string
  checked: boolean
  children?: NodeID[]
}

export interface FetchDocumentContent {
  _code: "Ok"
  title: string
  nodes: FetchDocumentNode[]
}

export const fetchDocumentContent = async (token: string, fileId: string) =>
  apiRequest<FetchDocumentContent>("/doc/read", token, {
    file_id: fileId,
  })
