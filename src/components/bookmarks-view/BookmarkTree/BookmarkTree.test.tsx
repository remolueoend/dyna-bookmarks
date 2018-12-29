import { render } from "enzyme"
import { rootNode } from "tests/fixtures"
import { BookmarkTree } from "./component"

describe("components/core/bookmarks-tree/BookmarkTree", () => {
  it.skip("renders correctly", () => {
    const tree = render(<BookmarkTree rootNode={rootNode} expandedNodes={[]} />)
    expect(tree).toBeFalsy()
  })
})
