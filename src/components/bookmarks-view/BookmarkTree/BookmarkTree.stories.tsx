import { storiesOf } from "@storybook/react"
import { rootNode } from "tests/fixtures"
import { BookmarkTree } from "./component"

storiesOf("bookmarks-view/BookmarkTree", module)
  .add("default view", () => (
    <BookmarkTree
      rootNode={rootNode}
      expandedNodes={["6cb5aed5-dbf6-4f2b-bfb1-7e8014b39cc1"]}
    />
  ))
  .add("with selected node", () => (
    <BookmarkTree
      rootNode={rootNode}
      expandedNodes={["6cb5aed5-dbf6-4f2b-bfb1-7e8014b39cc1"]}
      selectedNode={"cb600813-ab06-4a6d-ab2c-f56911c16e27"}
    />
  ))
