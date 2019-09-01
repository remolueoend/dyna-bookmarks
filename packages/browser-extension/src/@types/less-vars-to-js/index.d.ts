declare module "less-vars-to-js" {
  export interface LessToJsOptions {
    resolveVariables?: boolean
    stripPrefix?: boolean
  }
  export interface LessToJsResult {
    [variableName: string]: string
  }
  export default function lessToJs(
    lessCode: string,
    options?: LessToJsOptions,
  ): LessToJsResult
}
