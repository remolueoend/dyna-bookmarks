import { createBackgroundStore } from "redux-webext"
import { createStore } from "../redux-store"
import { fetchBookmarks } from "../state/bookmarks"

const backgroundStore = createBackgroundStore({
  store: createStore(),
})

backgroundStore.dispatch(fetchBookmarks())
