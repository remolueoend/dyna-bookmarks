import { shallow } from "enzyme"
import { Icon } from "./component"

describe("components/core/Icon", () => {
  it("executes the given handler on click", () => {
    const handler = jest.fn()
    const tree = shallow(<Icon onClick={handler} />)
    tree.simulate("click")

    expect(handler).toHaveBeenCalled()
  })
})
