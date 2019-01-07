import { Icon } from "antd"
import { hasChildren, NodeID } from "lib/trees"
import { BookmarksNode } from "state/bookmarks/data"
import styled, { css } from "styled-components"
import { getThemeVar, styledWithProps } from "theme"

export interface BookmarkTreeProps {
  style?: {}
  className?: string
  rootNode: BookmarksNode | undefined
  expandedNodes: NodeID[]
  selectedNode?: BookmarksNode
}

const BookmarkTreeBase = styled.div``

export const BookmarkTree: React.SFC<BookmarkTreeProps> = ({
  style,
  className,
  rootNode,
  expandedNodes,
  selectedNode,
}) =>
  !rootNode ? (
    <span>No data</span>
  ) : (
    <BookmarkTreeBase style={style} className={className}>
      {rootNode.children &&
        rootNode.children.map(child => (
          <TreeNode
            key={child.id}
            node={child}
            expandedNodes={expandedNodes}
            selectedNode={selectedNode}
          />
        ))}
    </BookmarkTreeBase>
  )

const NodeWrapper = styled.div`
  margin: 1px;
`
const NodeIcon = styled(Icon)`
  margin-right: 5px;
`
const NodeLabel = styledWithProps<{ selected: boolean }>()(styled.div)`
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: ${getThemeVar("background-color-light")};
  }
  ${({ selected }) =>
    selected &&
    css`
      background-color: ${getThemeVar("primary-color")} !important;
      color: white;
    `}
`

const NodeChildrenWrapper = styled.div`
  margin-left: 15px;
`

export interface TreeNodeProps {
  style?: {}
  className?: string
  node: BookmarksNode
  expandedNodes: NodeID[]
  selectedNode?: BookmarksNode
}
export const TreeNode: React.SFC<TreeNodeProps> = ({
  style,
  className,
  node,
  expandedNodes,
  selectedNode,
}) => {
  const isExpanded = expandedNodes.includes(node.id)
  return (
    <NodeWrapper>
      <NodeLabel selected={!!selectedNode && node.id === selectedNode.id}>
        <NodeIcon
          type={
            hasChildren(node) ? (isExpanded ? "folder-open" : "folder") : "link"
          }
        />
        {node.data.label}
      </NodeLabel>
      {!hasChildren(node) || !isExpanded ? null : (
        <NodeChildrenWrapper>
          {node.children.map(child => (
            <TreeNode
              style={style}
              className={className}
              node={child}
              expandedNodes={expandedNodes}
              selectedNode={selectedNode}
            />
          ))}
        </NodeChildrenWrapper>
      )}
    </NodeWrapper>
  )
}
