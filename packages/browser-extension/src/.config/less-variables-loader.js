const { getOptions } = require("loader-utils")
const less = require("less")
const VariablesOutput = require("less-plugin-variables-output")
const fs = require("fs")
const temp = require("temp")
const path = require("path")

temp.track()

/**
 * Webpack loader expecing a `*.less` file and resolving a JSON file containing
 * all variables and values declared in the input file and all files imported by the input file.
*/
module.exports = function loader(content) {
  const callback = this.async()
  const filename = this.resourcePath
  const tmpFolderPath = temp.mkdirSync("less-variables-loader")
  const jsonFilePath = path.join(tmpFolderPath, "resolved-variables.json")

  less
    .render(content, {
      filename,
      javascriptEnabled: true,
      plugins: [
        new VariablesOutput({
          filename: jsonFilePath,
        }),
      ],
    })
    .then(() => {
      const vars = require(jsonFilePath)
      callback(null, `module.exports = ${JSON.stringify(vars)}`)
    })
    .catch(callback)
}
