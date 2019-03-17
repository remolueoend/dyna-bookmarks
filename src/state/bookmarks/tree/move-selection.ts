import { exhaust } from "lib/exhaust"
import { BookmarksNode, NodeID } from "lib/trees"
import { without } from "ramda"

export type MoveNodeSelectionDir = "up" | "down" | "left" | "right"

export const moveSelection = (
  selectedNode: BookmarksNode | undefined,
  expandedNodes: NodeID[],
  dir: MoveNodeSelectionDir,
): { selectedNode: BookmarksNode | undefined; expandedNodes: NodeID[] } => {
  // if currently no node is selected or selected node is root (what should never ever happen),
  // we just return the current state as it is:
  if (!selectedNode || selectedNode.isRoot) {
    return { selectedNode, expandedNodes }
  }
  const node = selectedNode
  const parent = selectedNode.parent()!
  const expanded = expandedNodes
  const nodeIndex = selectedNode.getIndex()

  function moveUp() {
    if (nodeIndex === 0) {
      return {
        selectedNode: parent.id === "root" ? node : parent,
        expandedNodes: expanded,
      }
    } else {
      return {
        selectedNode: parent.getNthChild(nodeIndex - 1),
        expandedNodes: expanded,
      }
    }
  }

  function moveDown() {
    const childCount = parent.children!.length
    if (expanded.includes(node.id) && node.children && node.children.length) {
      return {
        selectedNode: node.firstChild(),
        expandedNodes: expanded,
      }
    }
    if (nodeIndex === childCount - 1) {
      // let's try to move to the next sibling of the current parent:
      const nextParentSilbing = node.parent().getNextSibling()

      if (nextParentSilbing) {
        return {
          selectedNode: nextParentSilbing,
          expandedNodes: expanded,
        }
      } else {
        return {
          selectedNode: node,
          expandedNodes: expanded,
        }
      }
    }

    return {
      selectedNode: parent.getNthChild(nodeIndex + 1),
      expandedNodes: expanded,
    }
  }

  function moveLeft() {
    if (expanded.includes(node.id)) {
      return {
        selectedNode: node,
        expandedNodes: without([node.id], expanded),
      }
    }
    if (parent.id !== "root") {
      return {
        selectedNode: parent,
        expandedNodes: without([parent.id], expanded),
      }
    }

    return {
      selectedNode: node,
      expandedNodes: expanded,
    }
  }

  function moveRight() {
    if (node.children && node.children.length) {
      return {
        selectedNode: node.firstChild(),
        expandedNodes: [...expanded, node.id],
      }
    } else {
      return {
        selectedNode: node,
        expandedNodes: expanded,
      }
    }
  }

  switch (dir) {
    case "up":
      return moveUp()
    case "down":
      return moveDown()
    case "left":
      return moveLeft()
    case "right":
      return moveRight()
  }
  exhaust(dir)
}
