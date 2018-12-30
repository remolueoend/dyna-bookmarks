import { Dispatch, Middleware } from "redux"
import {
  Action,
  ActionFunction0,
  ActionFunction1,
  ActionFunctionAny,
  BaseAction,
} from "redux-actions"
import { AppState } from "root-reducer"

export type AsyncActionHandler<TState> = (
  action: BaseAction,
  dispatch: Dispatch,
  getState: () => TState,
) => Promise<void>
export type AsyncActionHandlerWithPayload<TState, TPayload> = (
  action: Action<TPayload>,
  dispatch: Dispatch,
  getState: () => TState,
) => Promise<void>

export function createAsyncHandlerFor(
  _: ActionFunction0<BaseAction>,
  handler: AsyncActionHandler<AppState>,
): AsyncActionHandler<AppState>
export function createAsyncHandlerFor<TPaylaod, T1>(
  _: ActionFunction1<T1, Action<TPaylaod>>,
  handler: AsyncActionHandlerWithPayload<AppState, TPaylaod>,
): AsyncActionHandlerWithPayload<AppState, TPaylaod>
export function createAsyncHandlerFor<TPaylaod>(
  _: ActionFunctionAny<BaseAction>,
  handler: AsyncActionHandlerWithPayload<AppState, TPaylaod>,
): AsyncActionHandlerWithPayload<AppState, TPaylaod> {
  return handler
}

export interface AsyncActionMap<TState> {
  [actionType: string]: AsyncActionHandlerWithPayload<TState, any>
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
