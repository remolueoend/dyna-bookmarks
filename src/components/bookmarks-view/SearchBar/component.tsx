import { Input } from "antd"
import { SearchProps } from "antd/es/input/Search"
import Search from "antd/lib/input/Search"
import { getArrowKeyDirection } from "lib/keyboard"
import { NodeID } from "lib/trees"
import { KeyboardEvent, PureComponent, RefObject } from "react"
import { BookmarksNode } from "state/bookmarks/data"
import { moveSelection } from "state/bookmarks/tree/move-selection"
import styled from "styled-components"

const SearchInput = Input.Search

export interface SearchBarProps extends Pick<Required<SearchProps>, "value"> {
  style?: {}
  className?: string
  onChange: (term: string) => void
  changeNodeSelection: (
    selectedNode: NodeID | undefined,
    expandedNodes: NodeID[],
  ) => void
  moveResultSelection: (dir: "up" | "down") => void
  inputRef?: RefObject<Search>
  selectedNode: BookmarksNode | undefined
  expandedNodes: NodeID[]
}

const SearchBarBase = styled.div``

export class SearchBar extends PureComponent<SearchBarProps> {
  public render() {
    const { style, className, onChange, value, inputRef } = this.props

    return (
      <SearchBarBase className={className} style={style}>
        <SearchInput
          ref={inputRef}
          onChange={e => onChange(e.target.value)}
          onKeyDown={this.onKeyDown}
          value={value}
          placeholder="search bookmarks"
        />
      </SearchBarBase>
    )
  }

  protected onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const {
      changeNodeSelection,
      moveResultSelection,
      selectedNode,
      expandedNodes,
    } = this.props

    const pressedDirection = getArrowKeyDirection(e.keyCode)
    // do nothing if not an arrow key was pressed:
    if (typeof pressedDirection === "undefined") {
      return
    }

    if (!e.currentTarget.value) {
      const {
        expandedNodes: newExpandedNodes,
        selectedNode: newSelectedNode,
      } = moveSelection(selectedNode, expandedNodes, pressedDirection)
      changeNodeSelection(
        newSelectedNode && newSelectedNode.id,
        newExpandedNodes,
      )
      // only handle up and down keys in search results:
    } else if (pressedDirection === "up" || pressedDirection === "down") {
      moveResultSelection(pressedDirection)
    }
  }
}
