import { internet, lorem, random, seed } from "faker"
import { flattenTree } from "lib/trees"
import { times } from "ramda"
import { BookmarksNode } from "state/bookmarks/data"

seed(34567989726504680)

const genRandomChildren = (parent: BookmarksNode): BookmarksNode[] => {
  const isFolder = random.number({ min: 0, max: 10 }) < 2
  return !isFolder
    ? []
    : times(
        () => genBookmarkNode({ parent }),
        random.number({ min: 1, max: 10 }),
      )
}

export interface GenBookmarkNodeOptions {
  parent?: BookmarksNode
  children?: BookmarksNode[]
  noUrl?: boolean
  nodeId?: string
  label?: string
}
export const genBookmarkNode = ({
  parent,
  children,
  noUrl = false,
  nodeId = random.uuid(),
  label = lorem.words(),
}: GenBookmarkNodeOptions): BookmarksNode => {
  const node: BookmarksNode = {
    id: nodeId,
    data: {
      label,
      href: noUrl ? undefined : internet.url(),
    },
    parentNode: parent,
  }
  node.children = children || genRandomChildren(node)

  return node
}

export const rootNode = genBookmarkNode({
  nodeId: "root",
  label: "bookmarks",
  noUrl: true,
})
rootNode.children = times(
  () => genBookmarkNode({ parent: rootNode }),
  random.number({ min: 1, max: 40 }),
)

export const nodeList = flattenTree(rootNode, node => node.children || [])
