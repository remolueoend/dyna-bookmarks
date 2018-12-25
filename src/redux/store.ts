import { applyMiddleware, createStore } from "redux"
import { rootReducer } from "../actions/root-reducer"
import { createAsyncMiddleware } from "./redux-async"

export const store = createStore(
  rootReducer,
  applyMiddleware(createAsyncMiddleware({})),
)
