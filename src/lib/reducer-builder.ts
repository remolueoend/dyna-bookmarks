import { Reducer } from "redux"
import {
  Action,
  ActionFunction0,
  ActionFunction1,
  ActionFunction2,
  ActionFunctionAny,
  BaseAction,
  handleActions,
  ReducerMap,
} from "redux-actions"

/**
 * Class providing methods for building a redux reducer function.
 * Expects an initial state when constructed.
 */
export class ReducerBuilder<TState> {
  constructor(
    protected readonly initialState: TState,
    protected readonly reducerMap: ReducerMap<TState, any> = {},
  ) {}

  public addHandler(
    action: ActionFunction0<BaseAction>,
    handler: (state: TState, action: BaseAction) => TState,
  ): ReducerBuilder<TState>
  public addHandler<TPayload, T1>(
    action: ActionFunction1<T1, Action<TPayload>>,
    handler: (state: TState, action: Action<TPayload>) => TState,
  ): ReducerBuilder<TState>
  public addHandler<TPayload, T1, T2>(
    action: ActionFunction2<T1, T2, Action<TPayload>>,
    handler: (state: TState, action: Action<TPayload>) => TState,
  ): ReducerBuilder<TState>

  public addHandler(
    action: ActionFunctionAny<Action<any>>,
    handler: (state: TState, action: Action<any>) => TState,
  ) {
    return new ReducerBuilder<TState>(this.initialState, {
      ...this.reducerMap,
      [action.toString()]: handler,
    })
  }

  public addHandlers(builder: ReducerBuilder<TState>) {
    return new ReducerBuilder<TState>(this.initialState, {
      ...this.reducerMap,
      ...builder.reducerMap,
    })
  }

  public getReducer() {
    return handleActions(this.reducerMap, this.initialState) as Reducer<TState>
  }
}

export const reducer = <TState>(initialState: TState) =>
  new ReducerBuilder(initialState)
