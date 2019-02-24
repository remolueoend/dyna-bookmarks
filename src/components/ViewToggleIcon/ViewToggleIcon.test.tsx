import { render } from "enzyme"
import { ViewToggleIcon } from "./component"

const EMPTY_HANDLER = () => undefined

describe.skip("components/ViewToggleIcon", () => {
  it("renders correctly", () => {
    const tree = render(
      <ViewToggleIcon
        showAdd={EMPTY_HANDLER}
        showExplorer={EMPTY_HANDLER}
        viewId="explorer"
      />,
    )
    expect(tree).toBeFalsy()
  })
})
