import Search from "antd/lib/input/Search"
import { RefObject } from "react"
import { BookmarksNode } from "state/bookmarks/data"
import styled from "styled-components"
import { BookmarkTree } from "../BookmarkTree"
import { SearchBar } from "../SearchBar"
import { SearchResults } from "../SearchResults"

export interface BookmarksViewProps {
  style?: {}
  className?: string
  hasSearchTerm?: boolean
  searchInputRef?: RefObject<Search>
  onSelect: (node: BookmarksNode, openInNewTab: boolean) => void
}

const BookmarksViewBase = styled.div``

export const BookmarksView: React.SFC<BookmarksViewProps> = ({
  style,
  className,
  hasSearchTerm,
  searchInputRef,
  onSelect,
}) => (
  <BookmarksViewBase className={className} style={style}>
    <SearchBar inputRef={searchInputRef} onNodeSelect={onSelect} />
    {hasSearchTerm ? (
      <SearchResults onNodeSelect={onSelect} />
    ) : (
      <BookmarkTree onNodeSelect={onSelect} />
    )}
  </BookmarksViewBase>
)
