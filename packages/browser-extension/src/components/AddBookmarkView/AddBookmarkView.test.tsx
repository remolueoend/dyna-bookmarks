import { render } from "enzyme"
import { AddBookmarkView } from "./component"

describe("components/AddBookmarkView", () => {
  it.skip("renders correctly", () => {
    const tree = render(
      <AddBookmarkView
        currentTab={{ title: "test tab", url: "https://test.tab" }}
        addBookmark={() => undefined}
      />,
    )
    expect(tree).toBeFalsy()
  })
})
