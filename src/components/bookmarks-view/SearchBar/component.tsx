import { Input } from "antd"
import { SearchProps } from "antd/es/input/Search"
import styled from "styled-components"

const SearchInput = Input.Search

export interface SearchBarProps extends Pick<Required<SearchProps>, "value"> {
  style?: {}
  className?: string
  onChange: (term: string) => void
}

const SearchBarBase = styled.div``

export const SearchBar: React.SFC<SearchBarProps> = ({
  style,
  className,
  onChange,
  value,
}) => (
  <SearchBarBase className={className} style={style}>
    <SearchInput
      onChange={e => onChange(e.target.value)}
      value={value}
      placeholder="search bookmarks"
    />
  </SearchBarBase>
)
