import * as React from "react"
import { connect } from "react-redux"
import { lifecycle } from "recompose"
import { AppState } from "root-reducer"
import { BookmarksNode, fetchBookmarks } from "state/bookmarks"
import styled from "styled-components"

export interface HomeProps {
  style?: {}
  className?: string
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

const Home: React.SFC<HomeProps> = ({
  loading,
  rootNode,
  style,
  className,
}) => (
  <div className={className} style={style}>
    {loading && !rootNode ? (
      <span>loading...</span>
    ) : !rootNode ? (
      <span>no bookmarks...</span>
    ) : (
      <BookmarksRoot nodes={rootNode.children || []} />
    )}
  </div>
)

const StyledHome = styled(Home)`
  color: darkgray;
`

const HomeWithLifecicle = lifecycle<HomeProps, never>({
  componentDidMount() {
    this.props.fetchBookmarks()
  },
})(StyledHome)

const HomeWithState = connect(
  (state: AppState) => ({
    rootNode: state.bookmarks.root,
    loading: state.bookmarks.loading,
  }),
  { fetchBookmarks },
)(HomeWithLifecicle)

export default HomeWithState
