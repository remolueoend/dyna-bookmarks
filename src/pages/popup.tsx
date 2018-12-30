import { Button } from "antd"
import { BookmarksView } from "components/bookmarks-view/BookmarksView"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createUIStore } from "redux-webext"
import { fetchBookmarks } from "state/bookmarks"
import { importBookmarks } from "state/bookmarks/import"
// import { createGlobalStyle } from "styled-components"

/*
const GlobalStyles = createGlobalStyle`
  body {
    @import url(${browser.extension.getURL("assets/Nunito-Regular.ttf")});
    font-family: 'Nunito', sans-serif;
  }
`
*/

async function initApp() {
  const store = await createUIStore<{}>()

  const mountNode = document.createElement("div")
  document.body.appendChild(mountNode)

  ReactDOM.render(
    <Provider store={store}>
      <Button type="primary" onClick={() => store.dispatch(importBookmarks())}>
        Import Browser Bookmarks
      </Button>
      <BookmarksView />
    </Provider>,
    mountNode,
  )

  store.dispatch(fetchBookmarks())
}

initApp()
