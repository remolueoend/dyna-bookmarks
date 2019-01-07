import { Input } from "antd"
import { SearchProps } from "antd/es/input/Search"
import Search from "antd/lib/input/Search"
import { ChangeEvent, KeyboardEvent, PureComponent, RefObject } from "react"
import { MoveNodeSelectionDir } from "state/bookmarks/tree/move-selection"
import styled from "styled-components"

const SearchInput = Input.Search

export interface SearchBarProps extends Pick<Required<SearchProps>, "value"> {
  style?: {}
  className?: string
  onChange: (term: string) => void
  moveNodeSelection: (dir: MoveNodeSelectionDir) => void
  moveResultSelection: (dir: "up" | "down") => void
  inputRef?: RefObject<Search>
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
    if (!e.currentTarget.value) {
      switch (e.keyCode) {
        case 37:
          return this.props.moveNodeSelection("left")
        case 38:
          return this.props.moveNodeSelection("up")
        case 39:
          return this.props.moveNodeSelection("right")
        case 40:
          return this.props.moveNodeSelection("down")
      }
    } else {
      switch (e.keyCode) {
        case 38:
          return this.props.moveResultSelection("up")
        case 40:
          return this.props.moveResultSelection("down")
      }
    }
  }
}
