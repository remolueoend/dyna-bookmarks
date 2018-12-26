export const apiRequest = async <TResponse>(
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

  return responseContent
}
