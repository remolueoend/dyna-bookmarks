import { storiesOf } from "@storybook/react"
import { withState } from "tests/decorators"
import { rawNodes } from "tests/fixtures"
import { appState } from "tests/state-builder"
import { AppRoot } from "./component"

storiesOf("AppRoot", module)
  .addDecorator(
    withState(
      appState
        .withBookmarks(rawNodes)
        .withBookmarksTreeState({ selectedNode: rawNodes[0].children![0] }),
    ),
  )
  .add("default view", () => <AppRoot />)
