import { storiesOf } from "@storybook/react"
import { BookmarkTree } from "./component"

storiesOf("core/bookmarks-tree/BookmarkTree", module).add(
  "default view",
  () => <BookmarkTree />,
)
