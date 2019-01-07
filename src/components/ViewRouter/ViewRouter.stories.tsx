import { storiesOf } from "@storybook/react"
import { ViewRouter } from "./component"

storiesOf("ViewRouter", module).add("default view", () => (
  <ViewRouter currentView="explorer" />
))
