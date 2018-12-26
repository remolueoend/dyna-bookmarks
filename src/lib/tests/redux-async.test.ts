import { applyMiddleware, createStore } from "redux"
import { createAction } from "redux-actions"
import { reducer as reducerBuilder } from "../reducer-builder"
import { AsyncFunctionHandler, createAsyncMiddleware } from "../redux-async"

describe("redux-async", () => {
  it("does nothing if the dispatches action has no registered handler", () => {
    const reducer = jest.fn(() => ({ foo: 1 }))
    const action = { type: "foo-action" }
    const store = createStore(
      reducer,
      applyMiddleware(createAsyncMiddleware({})),
    )

    store.dispatch(action)

    expect(reducer).toBeCalledWith(expect.anything(), action)
    expect(store.getState()).toEqual({ foo: 1 })
  })

  it("always dispatches the originally dispatched action", () => {
    const action = { type: "foo-action" }
    const handler = jest.fn(() => Promise.resolve())
    const reducer = jest.fn(() => ({
      foo: 1,
    }))
    const store = createStore(
      reducer,
      applyMiddleware(createAsyncMiddleware({ [action.type]: handler })),
    )

    store.dispatch(action)

    expect(reducer).toBeCalledWith(expect.anything(), action)
  })

  it("calls the registered handler with the correct parameters", () => {
    const action = { type: "foo-action", payload: { foo: 1 } }
    const handler = jest.fn(() => Promise.resolve())
    const reducer = jest.fn(() => ({ foo: 2 }))
    const store = createStore(
      reducer,
      applyMiddleware(createAsyncMiddleware({ [action.type]: handler })),
    )

    store.dispatch(action)

    expect(handler).toBeCalledWith(
      action,
      expect.any(Function),
      expect.any(Function),
    )
  })

  it("allows to mutate the state asynchronously", () => {
    jest.useFakeTimers()
    const asyncAction = createAction("asyncAction", (value: number) => value)
    const finishedAction = createAction("loaded", (result: number) => result)
    const initState = { result: 0, loading: false }
    const reducer = reducerBuilder(initState)
      .addHandler(asyncAction, state => ({
        ...state,
        loading: true,
      }))
      .addHandler(finishedAction, (state, { payload }) => ({
        ...state,
        loading: false,
        result: payload!,
      }))
      .getReducer()
    const asyncHandler: AsyncFunctionHandler<typeof initState, number> = async (
      { payload },
      dispatch,
    ) => {
      setTimeout(() => {
        dispatch(finishedAction(payload! * 2))
      }, 1000)
    }
    const store = createStore(
      reducer,
      applyMiddleware(
        createAsyncMiddleware({
          [asyncAction.toString()]: asyncHandler,
        }),
      ),
    )

    store.dispatch(asyncAction(2))

    expect(store.getState()).toEqual({
      loading: true,
      result: 0,
    })

    jest.runAllTimers()

    expect(store.getState()).toEqual({
      loading: false,
      result: 4,
    })
  })
})
