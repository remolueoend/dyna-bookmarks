import { ApiResponse } from "./types"

/**
 * Sends an API request to the given dynalist API endpoint with the given token and additional params.
 * Rejects the returned promise if the API responds with a different response code than `Ok`.
 *
 * @template TResponse Type of api response to expect.
 *
 * @param endpoint The API endpoint to use, always prefixed with a `/`.
 * @param token Authentication token to use.
 * @param params request specific options sent as part of the request body.
 */
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
