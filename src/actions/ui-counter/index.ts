import { createAction } from "redux-actions"

export const increaseUICounter = createAction(
  "INCREASE_UI_COUNTER",
  (value: number) => value,
)

export const decreaseUICounter = createAction(
  "DECREASE_UI_COUNTER",
  (value: number) => value,
)
