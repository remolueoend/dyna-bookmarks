import { render } from "enzyme"
import { Provider } from "react-redux"
import { createStore } from "redux-store"
import { BookmarksView } from "./component"

describe("components/bookmarks-view/BookmarksView", () => {
  it.skip("renders correctly", () => {
    const tree = render(
      <Provider store={createStore()}>
        <BookmarksView />
      </Provider>,
    )
    expect(tree).toBeFalsy()
  })
})
