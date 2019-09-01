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

const createSFCAction = {
  type: "add",
  path: `src/components/{{folder}}/{{name}}/component.tsx`,
  templateFile: "plop-templates/sfc.hbs",
}
const createReduxContainerAction = {
  type: "add",
  path: `src/components/{{folder}}/{{name}}/container.tsx`,
  templateFile: "plop-templates/redux-container.hbs",
}
const createComponentStoriesAction = {
  type: "add",
  path: `src/components/{{folder}}/{{name}}/{{name}}.stories.tsx`,
  templateFile: "plop-templates/stories.hbs",
}
const createComponentTestAction = {
  type: "add",
  path: `src/components/{{folder}}/{{name}}/{{name}}.test.tsx`,
  templateFile: "plop-templates/tests.hbs",
}
const createComponentIndexAction = hasContainer => ({
  type: "add",
  path: `src/components/{{folder}}/{{name}}/index.tsx`,
  templateFile: `plop-templates/${
    hasContainer ? "container-index" : "sfc-index"
  }.hbs`,
})

const baseComponentActions = [
  createSFCAction,
  createComponentStoriesAction,
  createComponentTestAction,
]

module.exports = function(plop) {
  plop.setPrompt("directory", promptDirectory)
  plop.setGenerator("SFC", {
    description: "creates a template of a stateless functional component",
    prompts,
    actions: [...baseComponentActions, createComponentIndexAction(false)],
  }),
    plop.setGenerator("SFC & Redux", {
      description:
        "creates a template of an SFC and its belonging redux container",
      prompts,
      actions: [
        ...baseComponentActions,
        createReduxContainerAction,
        createComponentIndexAction(true),
      ],
    })
}
