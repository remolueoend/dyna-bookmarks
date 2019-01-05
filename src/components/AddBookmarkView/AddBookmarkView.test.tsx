import { render } from "enzyme"
import { AddBookmarkView } from "./component"

describe("components/AddBookmarkView", () => {
  it("renders correctly", () => {
    const tree = render(<AddBookmarkView />)
    expect(tree).toBeFalsy()
  })
})
