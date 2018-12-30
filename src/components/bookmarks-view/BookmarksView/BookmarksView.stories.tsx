import { storiesOf } from "@storybook/react"
import { withState } from "tests/decorators"
import { nodeList, rootNode } from "tests/fixtures"
import { appState } from "tests/state-builder"
import { BookmarksView } from "./component"

storiesOf("bookmarks-view/BookmarksView", module)
  .addDecorator(withState(appState.withBookmarks(nodeList, rootNode)))
  .add("default view", () => <BookmarksView />)

storiesOf("bookmarks-view/BookmarksView", module)
  .addDecorator(
    withState(
      appState.withBookmarks(nodeList, rootNode).withSearchTerm("quia et quis"),
    ),
  )
  .add("with search term", () => <BookmarksView hasSearchTerm />)
