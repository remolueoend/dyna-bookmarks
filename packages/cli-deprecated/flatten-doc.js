#!/usr/bin/env node

const envalid = require("envalid")
const { getFileContent } = require("./lib/api")
const {
  traverseDepthFirst,
  parseContentAsLink,
  resolveTree,
  resolveNodePath,
} = require("./lib/node")

const env = envalid.cleanEnv(
  process.env,
  {
    TOKEN: envalid.str(),
    DOCUMENT_ID: envalid.str(),
  },
  {
    strict: true,
    dotEnvPath: null,
  },
)

const main = async env => {
  // list structure of raw nodes (children/parents not resolved):
  const fileContent = await getFileContent(env.TOKEN, env.DOCUMENT_ID)
  // tree structure where node parents/children are resolved:
  const nodeTree = resolveTree(fileContent.nodes)
  // list structure of a DF traversal. The 3. argument maps a tree node to a list element:
  const nodes = traverseDepthFirst(
    nodeTree,
    n => n.children,
    (n, parent) => ({ parent, ...parseContentAsLink(n.content) }),
    n => !n.checked
  )

  // select subset of nodes which consist of a link:
  const linkNodes = nodes
    .filter(node => node.url)
    .map(node => ({
      ...node,
      path: resolveNodePath(node, n => n.parent, n => n.title),
    }))

  // map each node to a string for displaying them in rofi:
  return linkNodes
    .map(
      node => `${[...node.path.slice(1), node.title].join("/")}\t${node.url}`,
    )
    .join("\n")
}

main(env)
  .then(console.log)
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
