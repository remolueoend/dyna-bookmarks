import { storiesOf } from "@storybook/react"
import { rootNode } from "tests/fixtures"
import { BookmarkTree } from "./component"

const EMPTY_HANDLER = () => undefined

storiesOf("bookmarks-view/BookmarkTree", module)
  .add("default view", () => (
    <BookmarkTree
      onNodeSelect={EMPTY_HANDLER}
      addExpandedNode={EMPTY_HANDLER}
      removeExpandedNode={EMPTY_HANDLER}
      rootNode={rootNode}
      expandedNodes={["6cb5aed5-dbf6-4f2b-bfb1-7e8014b39cc1"]}
    />
  ))
  .add("with selected node", () => (
    <BookmarkTree
      addExpandedNode={EMPTY_HANDLER}
      removeExpandedNode={EMPTY_HANDLER}
      onNodeSelect={EMPTY_HANDLER}
      rootNode={rootNode}
      expandedNodes={["6cb5aed5-dbf6-4f2b-bfb1-7e8014b39cc1"]}
      selectedNode={rootNode.firstChild()}
    />
  ))
