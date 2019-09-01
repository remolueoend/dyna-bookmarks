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
  },
)

const main = async env => {
  const fileContent = await getFileContent(env.TOKEN, env.DOCUMENT_ID)
  const nodeTree = resolveTree(fileContent.nodes)
  const nodes = traverseDepthFirst(
    nodeTree,
    n => n.children,
    (n, parent) => ({ parent, ...parseContentAsLink(n.content) }),
  )

  const linkNodes = nodes
    .filter(node => node.url)
    .map(node => ({
      ...node,
      path: resolveNodePath(node, n => n.parent, n => n.title),
    }))

  return linkNodes
    .map(
      node => `${[...node.path.slice(1), node.title].join("/")}\t${node.url}`,
    )
    .join("\n")
}

main(env)
  .then(console.log)
  .catch(console.error)
