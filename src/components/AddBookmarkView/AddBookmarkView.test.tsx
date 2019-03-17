import { render } from "enzyme"
import { AddBookmarkView } from "./component"

describe("components/AddBookmarkView", () => {
  it.skip("renders correctly", () => {
    const tree = render(<AddBookmarkView addBookmark={() => undefined} />)
    expect(tree).toBeFalsy()
  })
})
