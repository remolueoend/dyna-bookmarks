import { MoveNodeSelectionDir } from "state/bookmarks/tree/move-selection"
import { match } from "./match"

const arrowKeyMatch = match<number, MoveNodeSelectionDir>([
  [37, "left"],
  [38, "up"],
  [39, "right"],
  [40, "down"],
])

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
  return arrowKeyMatch(keyCode)
}
