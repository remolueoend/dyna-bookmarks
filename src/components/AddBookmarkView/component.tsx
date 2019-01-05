import styled from "styled-components"

export interface AddBookmarkViewProps {
  style?: {}
  className?: string
}

const AddBookmarkViewBase = styled.div``

export const AddBookmarkView: React.SFC<AddBookmarkViewProps> = ({
  style,
  className,
}) => <AddBookmarkViewBase />
