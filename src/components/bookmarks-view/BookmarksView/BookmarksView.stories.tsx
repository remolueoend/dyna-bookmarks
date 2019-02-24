import { storiesOf } from "@storybook/react"
import { withState } from "tests/decorators"
import { rawNodes } from "tests/fixtures"
import { appState } from "tests/state-builder"
import { BookmarksView } from "./component"
import { BookmarksViewContainer } from "./container"

const EMPTY_HANDLER = () => undefined

storiesOf("bookmarks-view/BookmarksView", module)
  .addDecorator(withState(appState.withBookmarks(rawNodes)))
  .add("default view", () => <BookmarksView onSelect={EMPTY_HANDLER} />)

storiesOf("bookmarks-view/BookmarksView", module)
  .addDecorator(
    withState(appState.withBookmarks(rawNodes).withSearchTerm("quia et quis")),
  )
  .add("with search term", () => (
    <BookmarksView onSelect={EMPTY_HANDLER} hasSearchTerm />
  ))
  .add("container", () => <BookmarksViewContainer onSelect={EMPTY_HANDLER} />)
