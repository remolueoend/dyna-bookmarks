import { Icon } from "antd"
import { BookmarksNode, NodeID } from "lib/trees"
import styled, { css } from "styled-components"
import { getThemeVar, styledWithProps } from "theme"

export interface BookmarkTreeProps {
  style?: {}
  className?: string
  rootNode: BookmarksNode | undefined
  expandedNodes: NodeID[]
  selectedNode?: BookmarksNode
  onNodeSelect: (node: BookmarksNode, openInNewTab: boolean) => void
  addExpandedNode: (nodeId: NodeID) => void
  removeExpandedNode: (nodeId: NodeID) => void
}

const BookmarkTreeBase = styled.div``

export const BookmarkTree: React.SFC<BookmarkTreeProps> = ({
  style,
  className,
  rootNode,
  expandedNodes,
  selectedNode,
  onNodeSelect: onSelect,
  addExpandedNode,
  removeExpandedNode,
}) =>
  !rootNode ? (
    <span>No data</span>
  ) : (
    <BookmarkTreeBase style={style} className={className}>
      {rootNode.getChildRefs().map(child => (
        <TreeNode
          key={child.id}
          node={child}
          expandedNodes={expandedNodes}
          selectedNode={selectedNode}
          onClick={(node, e) => onSelect(node, e.metaKey)}
          addExpandedNode={addExpandedNode}
          removeExpandedNode={removeExpandedNode}
        />
      ))}
    </BookmarkTreeBase>
  )

const NodeWrapper = styled.div`
  margin: 1px;
`
const NodeIcon = styled(Icon)`
  margin-right: 5px;
  cursor: pointer;
`
const NodeLabel = styledWithProps<{ selected: boolean; children: any }>()(
  styled.div,
)`
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
  onClick?: (node: BookmarksNode, e: React.MouseEvent<HTMLSpanElement>) => void
  addExpandedNode: (nodeId: NodeID) => void
  removeExpandedNode: (nodeId: NodeID) => void
}
export const TreeNode: React.SFC<TreeNodeProps> = ({
  style,
  className,
  node,
  expandedNodes,
  selectedNode,
  onClick,
  addExpandedNode,
  removeExpandedNode,
}) => {
  const isExpanded = expandedNodes.includes(node.id)
  return (
    <NodeWrapper>
      <NodeLabel selected={!!selectedNode && node.id === selectedNode.id}>
        <NodeIcon
          onClick={() =>
            isExpanded ? removeExpandedNode(node.id) : addExpandedNode(node.id)
          }
          type={
            // show folder icon if a node has no url but also no children (kind of empty folder):
            node.hasChildren || !node.data.href
              ? isExpanded
                ? "folder-open"
                : "folder"
              : "link"
          }
        />
        <span onClick={onClick && (e => onClick(node, e))}>
          {node.data.label}
        </span>
      </NodeLabel>
      {!node.hasChildren || !isExpanded ? null : (
        <NodeChildrenWrapper>
          {node.getChildRefs().map(child => (
            <TreeNode
              key={child.id}
              style={style}
              className={className}
              node={child}
              expandedNodes={expandedNodes}
              selectedNode={selectedNode}
              onClick={onClick}
              addExpandedNode={addExpandedNode}
              removeExpandedNode={removeExpandedNode}
            />
          ))}
        </NodeChildrenWrapper>
      )}
    </NodeWrapper>
  )
}
