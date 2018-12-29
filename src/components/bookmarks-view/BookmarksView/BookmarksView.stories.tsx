import { storiesOf } from "@storybook/react"
import { Provider } from "react-redux"
import { createStore } from "redux-store"
import { BookmarksView } from "./component"

storiesOf("bookmarks-view/BookmarksView", module).add("default view", () => (
  <Provider store={createStore()}>
    <BookmarksView />
  </Provider>
))
