import { render } from "enzyme"
import { ViewRouter } from "./component"

describe("components/ViewRouter", () => {
  it("renders correctly", () => {
    const tree = render(<ViewRouter />)
    expect(tree).toBeFalsy()
  })
})
