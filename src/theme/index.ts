// tslint:disable:no-var-requires
import { ThemedStyledFunction } from "styled-components"

const defaultThemeVars = require("!../.config/less-variables-loader!antd/lib/style/themes/default.less")
const customThemeVars = require("!../.config/less-variables-loader!./theme-vars.less")

export const getThemeVar = (varName: string) => {
  const value = (customThemeVars[varName] ||
    defaultThemeVars[varName]) as string
  if (!value) {
    throw new Error(
      `no theme variable found with name: ${varName}.\n
      See https://github.com/ant-design/ant-design/tree/master/components/style/themes/default.less for available variables.`,
    )
  }

  return value
}

export const styledWithProps = <U>() => <
  P extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  T extends object,
  O extends object
>(
  fn: ThemedStyledFunction<P, T, O>,
): ThemedStyledFunction<P & U, T, O & U> => fn as any
