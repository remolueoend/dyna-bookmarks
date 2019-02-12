import { RawNode } from "lib/trees"
import { apiRequest } from "../request"
import { ApiResponse } from "../types"

/**
 * Describes a raw node of a dynalist document fetched from the API.
 */
export type FetchDocumentNode = RawNode<{
  content: string
  note?: string
  checked: boolean
}>

/**
 * Describes the dynalist API response of a document fetch.
 * Contains the title and the nodes of the fetched document.
 */
export interface FetchDocumentContentResponse extends ApiResponse {
  title: string
  nodes: FetchDocumentNode[]
}

/**
 * Fetches the title and content of the document with the given file ID.
 *
 * @param token The authentication token to use for the API request.
 * @param fileId The ID of the file to fetch.
 */
export const fetchDocumentContent = async (token: string, fileId: string) =>
  apiRequest<FetchDocumentContentResponse>("/doc/read", token, {
    file_id: fileId,
  })
