import { match } from "lib/match"
import { createBackgroundStore } from "redux-webext"
import { showAdd, showExplorer } from "state/view"
import { createStore } from "../redux-store"

const backgroundStore = createStore()

createBackgroundStore({
  store: backgroundStore,
})

const extensionCommandsMatch = match(
  [
    [
      "explore_bookmarks",
      () => {
        backgroundStore.dispatch(showExplorer())
        browser.browserAction.openPopup()
      },
    ],
    [
      "add_bookmark",
      () => {
        backgroundStore.dispatch(showAdd())
        browser.browserAction.openPopup()
      },
    ],
  ],
  value => {
    throw new Error(`unhandled extensions command: ${value}`)
  },
)

browser.commands.onCommand.addListener(command => {
  const commandHandler = extensionCommandsMatch(command)
  commandHandler()
})

browser.browserAction.onClicked.addListener(() => {
  backgroundStore.dispatch(showExplorer())
})
