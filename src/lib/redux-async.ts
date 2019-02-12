import { Dispatch, Middleware } from "redux"
import {
  Action,
  ActionFunction0,
  ActionFunction1,
  ActionFunctionAny,
  BaseAction,
} from "redux-actions"
import { AppState } from "root-reducer"

/**
 * Desribes the interface of an async action handler for actions without any payload.
 * Receives the dispatched action, the dispatcher function of the redux store,
 * and a function returning the current redux state.
 *
 * @template TState The type describing the redux state.
 */
export type AsyncActionHandler<TState> = (
  action: BaseAction,
  dispatch: Dispatch,
  getState: () => TState,
) => Promise<void>

/**
 * Desribes the interface of an async action handler for actions with payloads of type `TPayload`.
 * Receives the dispatched action, the dispatcher function of the redux store,
 * and a function returning the current redux state.
 *
 * @template TState The type describing the redux state.
 * @template TPaylaod The type of the action's payload.
 */
export type AsyncActionHandlerWithPayload<TState, TPayload> = (
  action: Action<TPayload>,
  dispatch: Dispatch,
  getState: () => TState,
) => Promise<void>

/**
 * Returns an async action handler for the given action creator.
 */
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

/**
 * Returns a redux middleware spying on all actions part of the given mapping
 * and executes its async function. The originally dispatched action is passed through
 * to the redux reducer.
 *
 * @param mapping An object mapping action types to their corresponding async function.
 */
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
