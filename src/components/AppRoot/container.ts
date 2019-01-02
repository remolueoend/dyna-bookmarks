import { connect } from "react-redux"
import { AppRoot } from "./component"

export interface AppRootContainerProps {}

export const AppRootContainer = connect(
  _ => ({}),
  {},
)(AppRoot)
