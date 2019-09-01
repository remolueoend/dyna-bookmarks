import { connect } from "react-redux"
import { AppState } from "root-reducer"
import { showAdd, showExplorer } from "state/view"
import { ViewToggleIcon } from "./component"

export const ViewToggleIconContainer = connect(
  (state: AppState) => ({ viewId: state.view.viewId }),
  { showAdd, showExplorer },
)(ViewToggleIcon)
