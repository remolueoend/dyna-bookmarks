import { exhaust } from "lib/exhaust"
import { getNextParentSibling, getNodeIndex, NodeID } from "lib/trees"
import { without } from "ramda"
import { BookmarksNode } from "../data"

export type MoveNodeSelectionDir = "up" | "down" | "left" | "right"

export const moveSelection = (
  selectedNode: BookmarksNode | undefined,
  expandedNodes: NodeID[],
  dir: MoveNodeSelectionDir,
): { selectedNode: BookmarksNode | undefined; expandedNodes: NodeID[] } => {
  // if currently no node is selected or selected node is root (what should never ever happen),
  // we just return the current state as it is:
  if (!selectedNode || !selectedNode.parentNode) {
    return { selectedNode, expandedNodes }
  }
  const node = selectedNode
  const parent = selectedNode.parentNode
  const expanded = expandedNodes
  const nodeIndex = getNodeIndex(selectedNode)! // we can use `!` here because selected node has to have a parent

  function moveUp() {
    if (nodeIndex === 0) {
      return {
        selectedNode: parent.id === "root" ? node : parent,
        expandedNodes: expanded,
      }
    } else {
      return {
        selectedNode: parent.children![nodeIndex - 1],
        expandedNodes: expanded,
      }
    }
  }

  function moveDown() {
    const childCount = parent.children!.length
    if (expanded.includes(node.id) && node.children && node.children.length) {
      return {
        selectedNode: node.children[0],
        expandedNodes: expanded,
      }
    }
    if (nodeIndex === childCount - 1) {
      // let's try to move to the next sibling of the current parent:
      const nextParentSilbing = getNextParentSibling(node)

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
      selectedNode: parent.children![nodeIndex + 1],
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
        selectedNode: node.children[0],
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
