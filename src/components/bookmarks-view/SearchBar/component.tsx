import { Input } from "antd"
import { SearchProps } from "antd/es/input/Search"
import Search from "antd/lib/input/Search"
import { RefObject } from "react"
import styled from "styled-components"

const SearchInput = Input.Search

export interface SearchBarProps extends Pick<Required<SearchProps>, "value"> {
  style?: {}
  className?: string
  onChange: (term: string) => void
  inputRef?: RefObject<Search>
}

const SearchBarBase = styled.div``

export const SearchBar: React.SFC<SearchBarProps> = ({
  style,
  className,
  onChange,
  value,
  inputRef,
}) => (
  <SearchBarBase className={className} style={style}>
    <SearchInput
      ref={inputRef}
      onChange={e => onChange(e.target.value)}
      value={value}
      placeholder="search bookmarks"
    />
  </SearchBarBase>
)
