import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import { withState } from "recompose"
import { SearchBar } from "./component"

const EMPTY_HANDLER = () => undefined

storiesOf("bookmarks-view/SearchBar", module).add("default view", () => {
  const onChangeAction = action("onChange")
  const ValueState = withState("value", "setValue", "")(
    ({ setValue, value }) => (
      <SearchBar
        onNodeSelect={EMPTY_HANDLER}
        selectedSearchResultNode={undefined}
        // tslint:disable:only-arrow-functions
        onChange={function(e) {
          onChangeAction(...arguments)
          setValue(e)
        }}
        value={value}
        changeNodeSelection={() => undefined}
        moveResultSelection={() => undefined}
        selectedNode={undefined}
        expandedNodes={[]}
      />
    ),
  )
  return <ValueState />
})
