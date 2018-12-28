import { Button } from "antd"
import { ButtonProps } from "antd/lib/button"
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

const StyledButton = (styled(Button)`
  width: 300px;
` as any) as React.ComponentType<ButtonProps>

const BookmarksNode: React.SFC<{ node: BookmarksNode }> = ({ node }) => (
  <li>
    <span>{node.data.content}</span>
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

export const Home: React.SFC<HomeProps> = ({
  loading,
  rootNode,
  style,
  className,
}) => (
  <div className={className} style={style}>
    <StyledButton type="primary">Star it!</StyledButton>
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
    rootNode: state.bookmarks.rootNode,
    loading: state.bookmarks.loading,
  }),
  { fetchBookmarks },
)(HomeWithLifecicle)

export default HomeWithState
