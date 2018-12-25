import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createUIStore } from "redux-webext"
import Home from "../../components/home"

async function initApp() {
  const store = await createUIStore<{}>()

  const mountNode = document.createElement("div")
  document.body.appendChild(mountNode)

  ReactDOM.render(
    <Provider store={store}>
      <Home />
    </Provider>,
    mountNode,
  )
}

initApp()
