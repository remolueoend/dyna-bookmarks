import Search from "antd/lib/input/Search"
import { createRef, PureComponent } from "react"
import styled from "styled-components"
import { BookmarksView } from "../bookmarks-view/BookmarksView"

export interface ExplorerViewProps {
  style?: {}
  className?: string
}

const ExplorerViewBase = styled.div``

export class ExplorerView extends PureComponent<ExplorerViewProps> {
  protected searchInputRef = createRef<Search>()

  public render() {
    const { style, className } = this.props
    return (
      <ExplorerViewBase style={style} className={className}>
        <BookmarksView searchInputRef={this.searchInputRef} />
      </ExplorerViewBase>
    )
  }

  public componentDidMount() {
    if (this.searchInputRef.current) {
      this.searchInputRef.current.focus()
    }
  }
}
