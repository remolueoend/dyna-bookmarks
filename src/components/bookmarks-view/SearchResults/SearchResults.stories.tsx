import { storiesOf } from "@storybook/react"
import { BookmarksNode } from "state/bookmarks"
import { SearchResults } from "./component"

const resultNodes: BookmarksNode[] = [
  {
    id: "123",
    path: ["project A", "development"],
    children: [],
    data: {
      content: "Gitlab",
    },
  },
  {
    id: "456",
    path: ["learning", "school", "coding"],
    children: [],
    data: {
      content: "Github",
    },
  },
  {
    id: "123",
    path: ["coding", "gitlab"],
    children: [],
    data: {
      content: "Project B",
    },
  },
]

storiesOf("bookmarks-view/SearchResults", module)
  .add("with results", () => <SearchResults results={resultNodes} />)
  .add("with selected result", () => (
    <SearchResults results={resultNodes} selectedIndex={1} />
  ))
  .add("without any results", () => <SearchResults results={[]} />)
