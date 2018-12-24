import { createStore } from 'redux'
import { createBackgroundStore } from 'redux-webext'
import reducer from './reducers'
import { incrementUICounter, decrementUICounter } from './actions'

const store = createStore(reducer)

export default createBackgroundStore({
  store,
})
