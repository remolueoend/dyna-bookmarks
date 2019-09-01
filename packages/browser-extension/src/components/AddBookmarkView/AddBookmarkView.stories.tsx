import { storiesOf } from "@storybook/react"
import { AddBookmarkView } from "./component"

storiesOf("AddBookmarkView", module).add("default view", () => (
  <AddBookmarkView
    addBookmark={() => undefined}
    currentTab={{ title: "test tab", url: "https://test.tab" }}
  />
))
