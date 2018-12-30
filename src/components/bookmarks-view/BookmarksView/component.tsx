import styled from "styled-components"
import { BookmarkTree } from "../BookmarkTree"
import { SearchBar } from "../SearchBar"
import { SearchResults } from "../SearchResults"

export interface BookmarksViewProps {
  style?: {}
  className?: string
  hasSearchTerm?: boolean
}

const BookmarksViewBase = styled.div``

export const BookmarksView: React.SFC<BookmarksViewProps> = ({
  style,
  className,
  hasSearchTerm,
}) => (
  <BookmarksViewBase className={className} style={style}>
    <SearchBar />
    {hasSearchTerm ? <SearchResults /> : <BookmarkTree />}
  </BookmarksViewBase>
)
