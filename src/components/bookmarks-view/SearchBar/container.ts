import { connect } from "react-redux"
import { AppState } from "root-reducer"
import { selectedNodeSelector } from "state/bookmarks/data/tree-selectors"
import { moveResultSelection, setSearchTerm } from "state/bookmarks/search"
import { changeNodeSelection } from "state/bookmarks/tree"
import { SearchBar } from "./component"

export const SearchBarContainer = connect(
  (state: AppState) => ({
    value: state.bookmarks.search.searchTerm || "",
    selectedNode: selectedNodeSelector(state),
    expandedNodes: state.bookmarks.tree.expandedNodes,
  }),
  {
    onChange: setSearchTerm,
    changeNodeSelection,
    moveResultSelection,
  },
)(SearchBar)
