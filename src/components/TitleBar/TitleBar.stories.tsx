import { storiesOf } from "@storybook/react"
import { TitleBar } from "./component"

storiesOf("TitleBar", module)
  .add("default view", () => (
    <TitleBar importRunning={false} importBookmarks={() => undefined} />
  ))
  .add("with running import", () => (
    <TitleBar importRunning importBookmarks={() => undefined} />
  ))
