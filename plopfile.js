const promptDirectory = require("inquirer-directory")
const prompts = [
  {
    type: "directory",
    name: "folder",
    basePath: "src/components",
    message: "base folder",
  },
  {
    type: "input",
    name: "name",
    message: "component name",
  },
]

const createSFCAction = filename => ({
  type: "add",
  path: `src/components/{{folder}}/{{name}}/${filename}.tsx`,
  templateFile: "plop-templates/sfc.hbs",
})
const createReduxContainerAction = () => ({
  type: "add",
  path: `src/components/{{folder}}/{{name}}/index.tsx`,
  templateFile: "plop-templates/redux-container.hbs",
})

module.exports = function(plop) {
  plop.setPrompt("directory", promptDirectory)
  plop.setGenerator("SFC", {
    description: "creates a template of a stateless functional component",
    prompts,
    actions: [createSFCAction("index")],
  }),
    plop.setGenerator("SFC & Redux", {
      description:
        "creates a template of an SFC and its belonging redux container",
      prompts,
      actions: [createReduxContainerAction(), createSFCAction("component")],
    })
}
