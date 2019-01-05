import { storiesOf } from "@storybook/react"
import { BookmarksNode } from "state/bookmarks/data"
import { SearchResults } from "./component"

const rootNode: BookmarksNode = {
  id: "root",
  data: {
    label: "root",
  },
}
const resultNodes: BookmarksNode[] = [
  {
    id: "123",
    parentNode: rootNode,
    children: [],
    data: {
      label: "Gitlab",
    },
  },
  {
    id: "456",
    parentNode: rootNode,
    children: [],
    data: {
      label: "Github",
    },
  },
  {
    id: "123",
    parentNode: rootNode,
    children: [],
    data: {
      label: "Project B",
    },
  },
]

storiesOf("bookmarks-view/SearchResults", module)
  .add("with results", () => <SearchResults results={resultNodes} />)
  .add("with selected result", () => (
    <SearchResults results={resultNodes} selectedIndex={1} />
  ))
  .add("without any results", () => <SearchResults results={[]} />)
