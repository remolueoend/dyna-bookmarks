import { Dispatch, Middleware } from "redux"
import { Action } from "redux-actions"

export type AsyncActionHandler<TState, TPayload = any> = (
  action: Action<TPayload>,
  dispatch: Dispatch,
  getState: () => TState,
) => Promise<void>

export interface AsyncActionMap<TState> {
  [actionType: string]: AsyncActionHandler<TState, any>
}

export const createAsyncMiddleware = <TState>(
  mapping: AsyncActionMap<TState>,
) => {
  const actionTypes = Object.keys(mapping)
  const middleware: Middleware<{}, TState, Dispatch> = ({
    dispatch,
    getState,
  }) => next => action => {
    const actionType = action.type
    if (typeof actionType === "string" && actionTypes.includes(actionType)) {
      const handler = mapping[actionType]
      return Promise.all([next(action), handler(action, dispatch, getState)])
    } else {
      return next(action)
    }
  }

  return middleware
}
