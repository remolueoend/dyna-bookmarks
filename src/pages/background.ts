import { createBackgroundStore } from "redux-webext"
import { store } from "../redux-store"
import { fetchBookmarks } from "../state/bookmarks"

const backgroundStore = createBackgroundStore({
  store,
})

backgroundStore.dispatch(fetchBookmarks())
