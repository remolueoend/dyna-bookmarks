import { storiesOf } from "@storybook/react"
import { Icon } from "./component"

storiesOf("core/Icon", module)
  .add("settings icon", () => <Icon type="setting" />)
  .add("loading", () => <Icon type="setting" loading />)
