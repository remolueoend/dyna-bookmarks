import { Action as ReduxAction } from "redux"

export interface CounterState {
  counter: number
}

export interface AppState {
  backgroundCounter: CounterState
  uiCounter: CounterState
}

export interface Action<TPayload> extends ReduxAction<string> {
  payload: TPayload
}
