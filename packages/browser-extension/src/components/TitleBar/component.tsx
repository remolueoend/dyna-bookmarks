import { Icon } from "components/core/Icon"
import { ViewToggleIcon } from "components/ViewToggleIcon"
import styled from "styled-components"

export interface TitleBarProps {
  style?: {}
  className?: string
  importBookmarks: () => void
  importRunning: boolean
}

const TitleBarBase = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 5px 0;
  > i {
    margin-left: 5px;
  }
`

export const TitleBar: React.SFC<TitleBarProps> = ({
  style,
  className,
  importBookmarks,
  importRunning,
}) => (
  <TitleBarBase style={style} className={className}>
    <Icon type="setting" />
    <Icon
      type="cloud-upload"
      loading={importRunning}
      onClick={() => importBookmarks()}
    />
    <ViewToggleIcon />
  </TitleBarBase>
)
