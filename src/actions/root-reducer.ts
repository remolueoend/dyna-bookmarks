import { combineReducers } from "redux"
import { Action, ActionFunction1 } from "redux-actions"
import { reducer } from "../lib/reducer-builder"
import { AppState } from "../redux/state"
import {
  decreaseBackgroundCounter,
  increaseBackgroundCounter,
} from "./background-counter"
import { decreaseUICounter, increaseUICounter } from "./ui-counter"

const createCounterReducer = (
  increaseAction: ActionFunction1<number, Action<number>>,
  decreaseAction: ActionFunction1<number, Action<number>>,
) =>
  reducer({ counter: 0 })
    .addHandler(increaseAction, (state, { payload }) => ({
      ...state,
      counter: state.counter + payload!,
    }))
    .addHandler(decreaseAction, (state, { payload }) => ({
      ...state,
      counter: state.counter - payload!,
    }))
    .getReducer()

export const rootReducer = combineReducers<AppState>({
  uiCounter: createCounterReducer(increaseUICounter, decreaseUICounter),
  backgroundCounter: createCounterReducer(
    increaseBackgroundCounter,
    decreaseBackgroundCounter,
  ),
})
