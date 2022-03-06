const fetch = require("node-fetch")

const send_request = async (path, body) => {
  const resp = await fetch(`https://dynalist.io/api/v1/${path}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const json = await resp.json()
  if (json._code && json._code !== "Ok") {
    throw new Error(`API Error ${json._code}: ${json._msg}`)
  }
  
  return json
}

const getFileContent = async (token, fileId) => {
  return send_request("doc/read", {
    token,
    file_id: fileId,
  })
}

module.exports = {
  getFileContent,
}
