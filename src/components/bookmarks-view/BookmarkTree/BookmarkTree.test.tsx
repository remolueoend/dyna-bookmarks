import { render } from "enzyme"
import { rootNode } from "tests/fixtures"
import { BookmarkTree } from "./component"

const EMPTY_HANDLER = () => undefined

describe("components/core/bookmarks-tree/BookmarkTree", () => {
  it.skip("renders correctly", () => {
    const tree = render(
      <BookmarkTree
        onNodeSelect={EMPTY_HANDLER}
        addExpandedNode={EMPTY_HANDLER}
        removeExpandedNode={EMPTY_HANDLER}
        rootNode={rootNode}
        expandedNodes={[]}
      />,
    )
    expect(tree).toBeFalsy()
  })
})
