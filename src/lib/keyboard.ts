import { MoveNodeSelectionDir } from "state/bookmarks/tree/move-selection"

function match<T, R>(cases: Array<[T, R]>): (value: T) => R | undefined
function match<T, R>(cases: Array<[T, R]>): (value: T, defaultValue: R) => R
function match<T, R>(
  cases: Array<[T, R]>,
): (value: T, defaultValue?: R) => R | undefined {
  return (value, defaultValue) => {
    const matchedValue = cases.find(([caseMatch]) => caseMatch === value)
    return !!matchedValue ? matchedValue[1] : defaultValue
  }
}

/**
 * Returns the pressed arrow key direction of undefined based on the given keycode.
 *
 * @export
 * @param {number} keyCode
 * @returns {(MoveNodeSelectionDir | undefined)}
 */
export function getArrowKeyDirection(
  keyCode: number,
): MoveNodeSelectionDir | undefined {
  return match<number, MoveNodeSelectionDir>([
    [37, "left"],
    [38, "up"],
    [39, "right"],
    [40, "down"],
  ])(keyCode)
}
