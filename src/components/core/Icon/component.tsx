import { Icon as AntdIcon } from "antd"
import { IconProps as AntIconProps } from "antd/lib/icon/index"
import styled from "styled-components"
import { getThemeVar } from "theme"

export interface IconProps extends AntIconProps {
  loading?: boolean
}

const IconBase = styled(AntdIcon)`
  cursor: pointer;

  > svg {
    transition: fill 0.2s ease-in-out;
    fill: ${getThemeVar("normal-color")};
  }
  &:hover {
    > svg {
      fill: ${getThemeVar("primary-color")};
    }
  }
`

export const Icon: React.SFC<IconProps> = ({ loading, ...props }) => (
  <IconBase {...props} type={loading ? "loading" : props.type} />
)
