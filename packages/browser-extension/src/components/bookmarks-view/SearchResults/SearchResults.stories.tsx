import { storiesOf } from "@storybook/react"
import { nodeList } from "tests/fixtures"
import { SearchResults } from "./component"

const resultNodes = nodeList.slice(10, 20)
const EMPTY_HANDLER = () => undefined

storiesOf("bookmarks-view/SearchResults", module)
  .add("with results", () => (
    <SearchResults
      onNodeSelect={EMPTY_HANDLER}
      results={resultNodes}
      selectedIndex={0}
    />
  ))
  .add("with selected result", () => (
    <SearchResults
      onNodeSelect={EMPTY_HANDLER}
      results={resultNodes}
      selectedIndex={1}
    />
  ))
  .add("without any results", () => (
    <SearchResults
      onNodeSelect={EMPTY_HANDLER}
      results={[]}
      selectedIndex={0}
    />
  ))
