import { storiesOf } from "@storybook/react"
import { withState } from "tests/decorators"
import { appState } from "tests/state-builder"
import { AppRoot } from "./component"

storiesOf("AppRoot", module)
  .addDecorator(withState(appState))
  .add("default view", () => <AppRoot />)
