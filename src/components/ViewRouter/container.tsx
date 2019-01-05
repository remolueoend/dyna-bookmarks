import { connect } from "react-redux"
import { AppState } from "root-reducer"
import { ViewRouter } from "./component"

export const ViewRouterContainer = connect(
  (state: AppState) => ({
    currentView: state.view.viewId,
  }),
  {},
)(ViewRouter)
