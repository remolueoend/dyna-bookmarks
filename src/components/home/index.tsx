import * as React from "react"
import { connect } from "react-redux"
import { lifecycle } from "recompose"
import { AppState } from "../../redux/state"
import { BookmarksNode, fetchBookmarks } from "../../state/bookmarks"

export interface HomeProps {
  loading: boolean
  rootNode: BookmarksNode | undefined
  fetchBookmarks: () => void
}

const BookmarksNode: React.SFC<{ node: BookmarksNode }> = ({ node }) => (
  <li>
    <span>{node.content}</span>
    <ul>
      {(node.children || []).map(child => (
        <BookmarksNode key={child.id} node={child} />
      ))}
    </ul>
  </li>
)

const BookmarksRoot: React.SFC<{ nodes: BookmarksNode[] }> = ({ nodes }) => (
  <ul>
    {nodes.map(node => (
      <BookmarksNode key={node.id} node={node} />
    ))}
  </ul>
)

const Home: React.SFC<HomeProps> = ({ loading, rootNode }) =>
  loading && !rootNode ? (
    <span>loading...</span>
  ) : !rootNode ? (
    <span>no bookmarks...</span>
  ) : (
    <BookmarksRoot nodes={rootNode.children || []} />
  )

const HomeWithLifecicle = lifecycle<HomeProps, never>({
  componentDidMount() {
    this.props.fetchBookmarks()
  },
})(Home)

const HomeWithState = connect(
  (state: AppState) => ({
    rootNode: state.bookmarks.root,
    loading: state.bookmarks.loading,
  }),
  { fetchBookmarks },
)(HomeWithLifecicle)

export default HomeWithState
