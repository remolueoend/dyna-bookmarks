import { List } from "antd"
import { BookmarksNode, getBookmarkPath } from "lib/trees"
import styled from "styled-components"
import { ResultItem } from "../ResultItem"

export interface SearchResultsProps {
  style?: {}
  className?: string
  results: BookmarksNode[]
  selectedIndex: number
  onNodeSelect: (node: BookmarksNode, openInNewTab: boolean) => void
}

const StyledListItem = styled(List.Item)`
  &&& {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 0px;
    padding-bottom: 0px;
  }
`

const SearchResultsBase = styled.div`
  width: 100%;
`

export const SearchResults: React.SFC<SearchResultsProps> = ({
  style,
  className,
  results,
  selectedIndex,
  onNodeSelect: onSelect,
}) => {
  return (
    <SearchResultsBase className={className} style={style}>
      <List
        locale={{
          emptyText: "no bookmarks found",
        }}
        size={"small"}
        dataSource={results}
        rowKey={(node: BookmarksNode) => node.id}
        renderItem={(node: BookmarksNode, index: number) => {
          return (
            <StyledListItem>
              <ResultItem
                onClick={e => onSelect(node, e.metaKey)}
                selected={
                  index ===
                  (selectedIndex >= 0
                    ? selectedIndex % results.length
                    : results.length -
                      1 -
                      ((Math.abs(selectedIndex) - 1) % results.length))
                }
                title={node.data.label}
                url={node.data.href}
                path={getBookmarkPath(node)}
              />
            </StyledListItem>
          )
        }}
      />
    </SearchResultsBase>
  )
}
