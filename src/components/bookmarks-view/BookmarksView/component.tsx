import styled from "styled-components"
import { BookmarkTree } from "../BookmarkTree"
import { SearchBar } from "../SearchBar"
import { SearchResults } from "../SearchResults"

export interface BookmarksViewProps {
  style?: {}
  className?: string
  searchTerm?: string
}

const BookmarksViewBase = styled.div``

export const BookmarksView: React.SFC<BookmarksViewProps> = ({
  style,
  className,
  searchTerm,
}) => (
  <BookmarksViewBase className={className} style={style}>
    <SearchBar onChange={() => undefined} onSearch={() => undefined} />
    {searchTerm ? <SearchResults /> : <BookmarkTree />}
  </BookmarksViewBase>
)
