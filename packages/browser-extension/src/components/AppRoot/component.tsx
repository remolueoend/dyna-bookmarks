import { TitleBar } from "components/TitleBar"
import styled from "styled-components"
import { ViewRouter } from "../ViewRouter"

export interface AppRootProps {
  style?: {}
  className?: string
}

const AppRootBase = styled.div`
  margin: 5px;
  border-radius: 3px;
  width: 300px;
`

export const AppRoot: React.SFC<AppRootProps> = ({ style, className }) => (
  <AppRootBase style={style} className={className}>
    <TitleBar />
    <ViewRouter />
  </AppRootBase>
)
