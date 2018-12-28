import { Input } from "antd"
import { SearchProps } from "antd/es/input/Search"
import styled from "styled-components"

const SearchInput = Input.Search

export interface SearchBarProps
  extends Pick<Required<SearchProps>, "onSearch" | "onChange" | "value"> {
  style?: {}
  className?: string
}

const SearchBarBase = styled.div``

export const SearchBar: React.SFC<SearchBarProps> = ({
  style,
  className,
  onSearch,
  onChange,
  value,
}) => (
  <SearchBarBase className={className} style={style}>
    <SearchInput onSearch={onSearch} onChange={onChange} value={value} />
  </SearchBarBase>
)
