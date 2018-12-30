import { RawNode } from "lib/trees"
import { apiRequest } from "../request"
import { ApiResponse } from "../types"

export type FetchDocumentNode = RawNode<{
  content: string
  note: string
  checked: boolean
}>

export interface FetchDocumentContentResponse extends ApiResponse {
  title: string
  nodes: FetchDocumentNode[]
}

export const fetchDocumentContent = async (token: string, fileId: string) =>
  apiRequest<FetchDocumentContentResponse>("/doc/read", token, {
    file_id: fileId,
  })
