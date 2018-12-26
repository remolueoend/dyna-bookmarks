import { storiesOf } from "@storybook/react"
import { Home } from "./index"

storiesOf("Home", module).add("loading", () => (
  <Home loading={false} rootNode={undefined} fetchBookmarks={() => undefined} />
))
