import { internet, lorem, random, seed } from "faker"
import { flattenTree } from "lib/trees"
import { times } from "ramda"
import { BookmarksNode } from "state/bookmarks"

seed(34567989726504680)

const genRandomChildren = (parent: {
  path: string[]
  label: string
}): BookmarksNode[] => {
  const isFolder = random.number({ min: 0, max: 10 }) < 2
  return !isFolder
    ? []
    : times(
        () => genBookmarkNode({ parent }),
        random.number({ min: 1, max: 10 }),
      )
}

export interface GenBookmarkNodeOptions {
  parent?: { path: string[]; label: string }
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
  const path = parent ? [...parent.path, parent.label] : []
  return {
    id: nodeId,
    data: {
      label,
      href: noUrl ? undefined : internet.url(),
    },
    path,
    children: children || genRandomChildren({ label, path }),
  }
}

export const rootNode = genBookmarkNode({
  nodeId: "root",
  label: "bookmarks",
  noUrl: true,
  children: times(
    () => genBookmarkNode({ parent: { label: "bookmarks", path: [] } }),
    random.number({ min: 1, max: 40 }),
  ),
})

export const nodeList = flattenTree(rootNode)
