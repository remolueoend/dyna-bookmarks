import { render } from "enzyme"
import { SearchBar } from "./component"

describe("components/core/bookmarks-tree/SearchBar", () => {
  it("renders correctly", () => {
    const tree = render(<SearchBar value="foo" onChange={() => undefined} />)
    expect(tree.find("input").attr("value")).toEqual("foo")
  })
})
