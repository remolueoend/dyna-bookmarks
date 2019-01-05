import Search from "antd/lib/input/Search"
import { RefObject } from "react"
import styled from "styled-components"
import { BookmarkTree } from "../BookmarkTree"
import { SearchBar } from "../SearchBar"
import { SearchResults } from "../SearchResults"

export interface BookmarksViewProps {
  style?: {}
  className?: string
  hasSearchTerm?: boolean
  searchInputRef?: RefObject<Search>
}

const BookmarksViewBase = styled.div``

export const BookmarksView: React.SFC<BookmarksViewProps> = ({
  style,
  className,
  hasSearchTerm,
  searchInputRef,
}) => (
  <BookmarksViewBase className={className} style={style}>
    <SearchBar inputRef={searchInputRef} />
    {hasSearchTerm ? <SearchResults /> : <BookmarkTree />}
  </BookmarksViewBase>
)
