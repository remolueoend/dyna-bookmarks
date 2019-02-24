import { storiesOf } from "@storybook/react"
import { ViewToggleIcon } from "./component"

const EMPTY_HANDLER = () => undefined

storiesOf("ViewToggleIcon", module)
  .add("in explorer view", () => (
    <ViewToggleIcon
      showAdd={EMPTY_HANDLER}
      showExplorer={EMPTY_HANDLER}
      viewId="explorer"
    />
  ))
  .add("in add-bookmark view", () => (
    <ViewToggleIcon
      showAdd={EMPTY_HANDLER}
      showExplorer={EMPTY_HANDLER}
      viewId="add"
    />
  ))
