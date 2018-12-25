import {
  decreaseBackgroundCounter,
  increaseBackgroundCounter,
} from "../../actions/background-counter"
import store from "./store"

// increment or decrement background counter every second
setInterval(() => {
  store.dispatch(
    Math.random() >= 0.5
      ? increaseBackgroundCounter(1)
      : decreaseBackgroundCounter(1),
  )
}, 1000)
