import { render } from "enzyme"
import { TitleBar } from "./component"

describe("components/TitleBar", () => {
  it.skip("renders correctly", () => {
    const tree = render(
      <TitleBar importRunning={false} importBookmarks={() => undefined} />,
    )
    expect(tree).toBeFalsy()
  })
})
