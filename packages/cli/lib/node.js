const traverseDepthFirst = (
  node,
  getChildren,
  mapNode = n => n,
  parentNode = null,
) => {
  const mappedNode = mapNode(node, parentNode)
  return [
    mappedNode,
    ...Array.prototype.concat(
      ...getChildren(node).map(childNode =>
        traverseDepthFirst(childNode, getChildren, mapNode, mappedNode),
      ),
    ),
  ]
}

const parseContentAsLink = nodeContent => {
  const result = /\[(.*)\]\((.*)\)/.exec(nodeContent)
  if (result && result.length === 3) {
    return {
      title: result[1],
      url: result[2],
    }
  }
  return { title: nodeContent }
}

const resolveTree = nodes => {
  const nodeMap = new Map(nodes.map(node => [node.id, node]))

  nodes.forEach(node => {
    node.children = (node.children || []).map(childNodeId =>
      nodeMap.get(childNodeId),
    )
  })

  return nodes[0]
}

const resolveNodePath = (node, getParent, getNodeTitle) => {
  const parent = getParent(node)
  return parent
    ? [
        ...resolveNodePath(parent, getParent, getNodeTitle),
        getNodeTitle(parent),
      ]
    : []
}

module.exports = {
  traverseDepthFirst,
  parseContentAsLink,
  resolveTree,
  resolveNodePath,
}
