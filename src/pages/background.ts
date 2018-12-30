import { createBackgroundStore } from "redux-webext"
import { createStore } from "../redux-store"

createBackgroundStore({
  store: createStore(),
})

// backgroundStore.dispatch(fetchBookmarks())
