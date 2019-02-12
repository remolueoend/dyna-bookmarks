import { storiesOf } from "@storybook/react"
import { nodeList } from "tests/fixtures"
import { SearchResults } from "./component"

const resultNodes = nodeList.slice(10, 20)

storiesOf("bookmarks-view/SearchResults", module)
  .add("with results", () => (
    <SearchResults results={resultNodes} selectedIndex={0} />
  ))
  .add("with selected result", () => (
    <SearchResults results={resultNodes} selectedIndex={1} />
  ))
  .add("without any results", () => (
    <SearchResults results={[]} selectedIndex={0} />
  ))
