import { createBackgroundStore } from "redux-webext"
import {
  decreaseBackgroundCounter,
  increaseBackgroundCounter,
} from "../../actions/background-counter"
import { store } from "../../redux/store"

const backgroundStore = createBackgroundStore({
  store,
})

// increment or decrement background counter every second
setInterval(() => {
  backgroundStore.dispatch(
    Math.random() >= 0.5
      ? increaseBackgroundCounter(1)
      : decreaseBackgroundCounter(1),
  )
}, 1000)
