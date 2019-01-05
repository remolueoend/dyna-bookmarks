import { render } from "enzyme"
import { ResultItem } from "./component"

describe("components/bookmarks-view/ResultItem", () => {
  it("renders correctly", () => {
    const tree = render(
      <ResultItem title="" path={[]} url="" selected={false} />,
    )
    expect(tree).toBeFalsy()
  })
})
