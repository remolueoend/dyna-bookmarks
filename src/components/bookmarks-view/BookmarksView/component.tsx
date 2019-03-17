import Search from "antd/lib/input/Search"
import { BookmarksNode } from "lib/trees"
import { createRef, PureComponent } from "react"
import styled from "styled-components"
import { BookmarkTree } from "../BookmarkTree"
import { SearchBar } from "../SearchBar"
import { SearchResults } from "../SearchResults"

export interface BookmarksViewProps {
  style?: {}
  className?: string
  hasSearchTerm?: boolean
  onSelect: (node: BookmarksNode, openInNewTab: boolean) => void
}

const BookmarksViewBase = styled.div``

export class BookmarksView extends PureComponent<BookmarksViewProps> {
  protected searchInputRef = createRef<Search>()
  public render() {
    const { style, className, hasSearchTerm, onSelect } = this.props
    return (
      <BookmarksViewBase className={className} style={style}>
        <SearchBar inputRef={this.searchInputRef} onNodeSelect={onSelect} />
        {hasSearchTerm ? (
          <SearchResults onNodeSelect={onSelect} />
        ) : (
          <BookmarkTree onNodeSelect={onSelect} />
        )}
      </BookmarksViewBase>
    )
  }

  public componentDidMount() {
    if (this.searchInputRef.current) {
      this.searchInputRef.current.focus()
    }
  }
}
