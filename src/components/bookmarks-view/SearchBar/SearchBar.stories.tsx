import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import { withState } from "recompose"
import { SearchBar } from "./component"

storiesOf("bookmarks-view/SearchBar", module).add("default view", () => {
  const onChangeAction = action("onChange")
  const ValueState = withState("value", "setValue", "")(
    ({ setValue, value }) => (
      <SearchBar
        // tslint:disable:only-arrow-functions
        onChange={function(e) {
          onChangeAction(...arguments)
          setValue(e)
        }}
        value={value}
        moveNodeSelection={() => undefined}
        moveResultSelection={() => undefined}
      />
    ),
  )
  return <ValueState />
})
