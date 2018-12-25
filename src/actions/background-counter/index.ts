import { createAction } from "redux-actions"

export const increaseBackgroundCounter = createAction(
  "INCREASE_BG_COUNTER",
  (value: number) => value,
)

export const decreaseBackgroundCounter = createAction(
  "DECREASE_BG_COUNTER",
  (value: number) => value,
)
