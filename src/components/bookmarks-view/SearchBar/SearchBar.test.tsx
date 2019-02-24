import { render } from "enzyme"
import { SearchBar } from "./component"

const EMPTY_HANDLER = () => undefined

describe("components/core/bookmarks-tree/SearchBar", () => {
  it("renders correctly", () => {
    const tree = render(
      <SearchBar
        onNodeSelect={EMPTY_HANDLER}
        selectedSearchResultNode={undefined}
        value="foo"
        onChange={() => undefined}
        changeNodeSelection={() => undefined}
        moveResultSelection={() => undefined}
        selectedNode={undefined}
        expandedNodes={[]}
      />,
    )
    expect(tree.find("input").attr("value")).toEqual("foo")
  })
})
