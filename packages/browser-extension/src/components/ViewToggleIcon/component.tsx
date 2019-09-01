import { Icon } from "components/core/Icon"
import { exhaust } from "lib/exhaust"
import { ViewIdentifier } from "state/view"

export interface ViewToggleIconProps {
  style?: {}
  className?: string
  showAdd: () => void
  showExplorer: () => void
  viewId: ViewIdentifier
}

export const ViewToggleIcon: React.SFC<ViewToggleIconProps> = ({
  style,
  className,
  viewId,
  showExplorer,
  showAdd,
}) => {
  let action: typeof showExplorer
  let iconType: "align-left" | "star"

  // we use a switch-case statement here so that we can exhaust it:
  switch (viewId) {
    case "add":
      action = showExplorer
      iconType = "align-left"
      break
    case "explorer":
      action = showAdd
      iconType = "star"
      break
    default:
      exhaust(viewId)
      throw new Error("[components/ViewToggleIcon]: unhandled view identifier.")
  }

  return (
    <Icon
      highlighted
      style={style}
      className={className}
      type={iconType}
      onClick={() => action()}
    />
  )
}
