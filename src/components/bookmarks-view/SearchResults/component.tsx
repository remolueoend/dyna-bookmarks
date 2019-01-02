import { List } from "antd"
import { BookmarksNode } from "state/bookmarks/data"
import styled, { css } from "styled-components"
import { getThemeVar, styledWithProps } from "theme"

const StyledListItem = styledWithProps<{ selected: boolean }>()(
  styled(List.Item),
)`
  &:hover {
    background-color: ${getThemeVar("background-color-light")};
    cursor: pointer;
  }
  ${({ selected }) =>
    selected &&
    css`
      background-color: ${getThemeVar("primary-color")} !important;
      & div,
      h4 {
        color: white;
      }
    `}
`

export interface SearchResultsProps {
  style?: {}
  className?: string
  results: BookmarksNode[]
  selectedIndex?: number
}

const SearchResultsBase = styled.div``

export const SearchResults: React.SFC<SearchResultsProps> = ({
  style,
  className,
  results,
  selectedIndex,
}) => (
  <SearchResultsBase className={className} style={style}>
    <List
      locale={{
        emptyText: "no bookmarks found",
      }}
      bordered
      size={"small"}
      dataSource={results}
      renderItem={(node: BookmarksNode, index: number) => (
        <StyledListItem selected={index === selectedIndex}>
          <List.Item.Meta
            title={node.data.label}
            description={node.path.join("/")}
          />
        </StyledListItem>
      )}
    />
  </SearchResultsBase>
)
