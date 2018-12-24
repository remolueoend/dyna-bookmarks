import { combineReducers } from 'redux'
import { CounterState, AppState, Action } from '../../redux'

function createCounterReducer(increment: string, decrement: string) {
  return function(
    state: CounterState = { counter: 0 },
    action: Action<number>,
  ) {
    const value = action || 1
    switch (action.type) {
      case increment:
        return {
          ...state,
          counter: state.counter + action.payload,
        }
      case decrement:
        return {
          ...state,
          counter: state.counter - action.payload,
        }
      default:
        return state
    }
  }
}

export default combineReducers<AppState>({
  backgroundCounter: createCounterReducer(
    'INCREMENT_BACKGROUND_COUNTER',
    'DECREMENT_BACKGROUND_COUNTER',
  ),
  uiCounter: createCounterReducer(
    'INCREMENT_UI_COUNTER',
    'DECREMENT_UI_COUNTER',
  ),
})
