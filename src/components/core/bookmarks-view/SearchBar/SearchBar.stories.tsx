import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import { withState } from "recompose"
import { SearchBar } from "./component"

storiesOf("core/bookmarks-tree/SearchBar", module).add("default view", () => {
  const onChangeAction = action("onChange")
  const ValueState = withState("value", "setValue", "")(
    ({ setValue, value }) => (
      <SearchBar
        onSearch={action("onSearch")}
        onChange={e => {
          onChangeAction(...arguments)
          setValue(e.target.value)
        }}
        value={value}
      />
    ),
  )
  return <ValueState />
})
