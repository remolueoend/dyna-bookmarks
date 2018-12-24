import * as React from 'react'
import * as actions from '../../pages/popup/actions'
import { connect } from 'react-redux'
import { AppState, CounterState } from '../../redux'

export interface HomeProps {
  backgroundCounter: CounterState
  uiCounter: CounterState
  incrementUICounter: () => void
  decrementUICounter: () => void
}

const Home: React.SFC<HomeProps> = ({
  backgroundCounter,
  uiCounter,
  incrementUICounter,
  decrementUICounter,
}) => (
  <div style={{ width: 200 }}>
    <div>Background counter: {backgroundCounter.counter}</div>
    <div>
      UI counter: {uiCounter.counter}
      <div>
        <button onClick={decrementUICounter}>-</button>
        <span> </span>
        <button onClick={incrementUICounter}>+</button>
      </div>
    </div>
  </div>
)

export default connect(
  (state: AppState) => state,
  actions,
)(Home)
