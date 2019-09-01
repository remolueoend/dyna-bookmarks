import { storiesOf } from "@storybook/react"
import { ResultItem } from "./component"

storiesOf("bookmarks-view/ResultItem", module)
  .add("with URL", () => (
    <ResultItem
      title="Welcome to Dynalist"
      url="https://dynalist.io/welcome"
      path={["apps", "saved"]}
      selected={false}
    />
  ))
  .add("without URL", () => (
    <ResultItem title="saved" path={["apps"]} selected={false} />
  ))
  .add("selected", () => (
    <ResultItem
      title="Welcome to Dynalist"
      url="https://dynalist.io/welcome"
      path={["apps", "saved"]}
      selected
    />
  ))
