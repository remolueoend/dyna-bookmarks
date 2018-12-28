import { render } from "enzyme"
import { SearchResults } from "./component"

describe("components/bookmarks-view/SearchResults", () => {
  it.skip("renders correctly", () => {
    const tree = render(<SearchResults results={[]} />)
    expect(tree).toBeFalsy()
  })
})
