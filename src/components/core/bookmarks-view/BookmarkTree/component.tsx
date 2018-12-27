import styled from "styled-components"

export interface BookmarkTreeProps {
  style?: {}
  className?: string
}

const BookmarkTreeBase = styled.div``

export const BookmarkTree: React.SFC<BookmarkTreeProps> = ({
  style,
  className,
}) => <BookmarkTreeBase />
