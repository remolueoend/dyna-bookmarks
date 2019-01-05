import { reducer } from "lib/reducer-builder"
import { createAction } from "redux-actions"

export type ViewIdentifier = "explorer" | "add"

export interface ViewState {
  viewId: ViewIdentifier
  showLinksOnly: boolean
}

export const initViewState: ViewState = {
  viewId: "explorer",
  showLinksOnly: true,
}

export const showExplorer = createAction("view/show-explorer", () => undefined)
export const showAdd = createAction("view/show-add", () => undefined)

export const viewStateReducer = reducer(initViewState)
  .addHandler(showExplorer, state => ({
    ...state,
    viewId: "explorer",
    showLinksOnly: true,
  }))
  .addHandler(showAdd, state => ({
    ...state,
    viewId: "add",
    showLinksOnly: false,
  }))
  .getReducer()
