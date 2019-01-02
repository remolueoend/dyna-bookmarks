import { BookmarksView } from "components/bookmarks-view/BookmarksView"
import { TitleBar } from "components/TitleBar"
import styled from "styled-components"

export interface AppRootProps {
  style?: {}
  className?: string
}

const AppRootBase = styled.div`
  margin: 5px;
  border-radius: 3px;
`

export const AppRoot: React.SFC<AppRootProps> = ({ style, className }) => (
  <AppRootBase style={style} className={className}>
    <TitleBar />
    <BookmarksView />
  </AppRootBase>
)
