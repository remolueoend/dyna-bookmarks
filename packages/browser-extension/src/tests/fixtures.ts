import { FetchDocumentNode } from "api/fetch-document"
import { internet, lorem, random, seed } from "faker"
import { flatten, times } from "ramda"
import { resolveFetchedNodes } from "state/bookmarks/data/fetch-bookmarks"

seed(34567989726504680)

const generateRawNodes = (
  {
    hasUrl,
    isFolder,
    nodeId,
  }: {
    hasUrl?: boolean
    isFolder?: boolean
    nodeId?: string
  } = { hasUrl: true },
  level = 0,
): FetchDocumentNode[] => {
  const label = lorem.words()
  const node: FetchDocumentNode = {
    checked: false,
    content: hasUrl !== false ? `[${label}](${internet.url()})` : label,
    id: typeof nodeId === "string" ? nodeId : random.uuid(),
  }
  const nodes = [node]
  const genChildren =
    typeof isFolder === "boolean"
      ? isFolder
      : random.number({ min: 0, max: 10 }) < 5 - level
  if (genChildren) {
    const children = times(
      () => generateRawNodes({}, level + 1),
      random.number({ min: 5, max: 10 }),
    )
    // only link first node (direct child) of each generated subtree:
    node.children = children.map(subtree => subtree[0]).map(child => child.id)

    nodes.push(...flatten(children))
  }

  return nodes
}

export const rawNodes = generateRawNodes({ isFolder: true, nodeId: "root" })
export const [rootNode] = resolveFetchedNodes(rawNodes)
export const nodeList = rootNode.flatten()
