import { render } from "enzyme"
import { ExplorerView } from "./component"

describe.skip("components/ExplorerView", () => {
  it("renders correctly", () => {
    const tree = render(<ExplorerView />)
    expect(tree).toBeFalsy()
  })
})
