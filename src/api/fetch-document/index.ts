import { RawNode } from "lib/trees"
import { apiRequest } from "../request"

export type FetchDocumentNode = RawNode<{
  content: string
  note: string
  checked: boolean
}>

export interface FetchDocumentContent {
  _code: "Ok"
  title: string
  nodes: FetchDocumentNode[]
}

export const fetchDocumentContent = async (token: string, fileId: string) =>
  apiRequest<FetchDocumentContent>("/doc/read", token, {
    file_id: fileId,
  })
