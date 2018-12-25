import { createStore } from "redux"
import { createBackgroundStore } from "redux-webext"
import { rootReducer } from "../../actions/root-reducer"

const store = createStore(rootReducer)

export default createBackgroundStore({
  store,
})
