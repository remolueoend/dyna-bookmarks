/**
 * A dummy function used to assert the exhaustiveness of a select-case statement.
 * should actually never be called but generate a compile-time error.
 *
 * @param v any value.
 */
export const exhaust = (v: never): never => {
  throw new Error(`${v} was not handled by a switch/case statement`)
}
