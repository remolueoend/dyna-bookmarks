import { ApiResponse } from "./types"

export const apiRequest = async <TResponse extends ApiResponse>(
  endpoint: string,
  token: string,
  params: {},
) => {
  const response = await fetch(`https://dynalist.io/api/v1${endpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      ...params,
    }),
  })

  const responseContent: TResponse = await response.json()
  if (responseContent._code !== "Ok") {
    throw new Error(
      `API request failed with code: ${
        responseContent._code
      }: ${responseContent._msg || "no message provided"}`,
    )
  }

  return responseContent
}
