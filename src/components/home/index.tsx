import * as React from "react"
import { connect } from "react-redux"
import * as actions from "../../actions/ui-counter"
import { AppState, CounterState } from "../../redux"

export interface HomeProps {
  backgroundCounter: CounterState
  uiCounter: CounterState
  increaseUICounter: (value: number) => void
  decreaseUICounter: (value: number) => void
}

const Home: React.SFC<HomeProps> = ({
  backgroundCounter,
  uiCounter,
  increaseUICounter,
  decreaseUICounter,
}) => (
  <div style={{ width: 200 }}>
    <div>Background counter: {backgroundCounter.counter}</div>
    <div>
      UI counter: {uiCounter.counter}
      <div>
        <button onClick={() => decreaseUICounter(3)}>-</button>
        <span />
        <button onClick={() => increaseUICounter(3)}>+</button>
      </div>
    </div>
  </div>
)

export default connect(
  (state: AppState) => state,
  actions,
)(Home)
