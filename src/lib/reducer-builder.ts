import { Reducer } from "redux"
import {
  Action,
  ActionFunction0,
  ActionFunction1,
  ActionFunctionAny,
  BaseAction,
  handleActions,
  ReducerMap,
} from "redux-actions"

export class ReducerBuilder<TState> {
  constructor(
    protected initialState: TState,
    protected reducerMap: ReducerMap<TState, any> = {},
  ) {}

  public addHandler(
    action: ActionFunction0<BaseAction>,
    handler: (state: TState, action: BaseAction) => TState,
  ): ReducerBuilder<TState>
  public addHandler<TPayload, T1>(
    action: ActionFunction1<T1, Action<TPayload>>,
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

  public addHandlerOld<TPayload>(
    type: string,
    handler: (state: TState, action: Action<TPayload>) => TState,
  ) {
    return new ReducerBuilder<TState>(this.initialState, {
      ...this.reducerMap,
      [type]: handler,
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
