import { ViewIdentifier } from "state/view"
import styled from "styled-components"
import { AddBookmarkView } from "../AddBookmarkView"
import { ExplorerView } from "../ExplorerView"

export interface ViewRouterProps {
  style?: {}
  className?: string
  currentView: ViewIdentifier
}

const ViewRouterBase = styled.div``

export const ViewRouter: React.SFC<ViewRouterProps> = ({
  style,
  className,
  currentView,
}) => (
  <ViewRouterBase style={style} className={className}>
    {currentView === "explorer" ? <ExplorerView /> : <AddBookmarkView />}
  </ViewRouterBase>
)
