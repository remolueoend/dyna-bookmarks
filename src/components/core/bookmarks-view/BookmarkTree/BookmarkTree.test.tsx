import { render } from "enzyme"
import { BookmarkTree } from "./component"

describe("components/core/bookmarks-tree/BookmarkTree", () => {
  it("renders correctly", () => {
    const tree = render(<BookmarkTree />)
    expect(tree).toBeFalsy()
  })
})
