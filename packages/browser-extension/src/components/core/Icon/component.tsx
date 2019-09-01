import { Icon as AntdIcon } from "antd"
import { IconProps as AntIconProps } from "antd/lib/icon/index"
import styled from "styled-components"
import { getThemeVar, styledWithProps } from "theme"

export interface IconProps extends AntIconProps {
  loading?: boolean
  highlighted?: boolean
}

const IconBase = styledWithProps<{ highlighted?: boolean } & IconProps>()(
  styled(AntdIcon),
)`
  cursor: pointer;

  > svg {
    transition: fill 0.2s ease-in-out;
    fill: ${({ highlighted }) =>
      getThemeVar(highlighted ? "primary-color" : "normal-color")};
  }
  &:hover {
    > svg {
      fill: ${getThemeVar("primary-color")};
    }
  }
`

export const Icon: React.SFC<IconProps> = ({
  loading,
  highlighted,
  ...props
}) => (
  <IconBase
    {...props}
    type={loading ? "loading" : props.type}
    highlighted={highlighted}
  />
)
