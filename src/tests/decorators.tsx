import { StoryDecorator } from "@storybook/react"
import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { createStore } from "redux-store"
import { appState } from "tests/state-builder"

/**
 * Accepts an initial state and returns a story decorator which can be used to decorate
 * stories which depend on a redux state.
 *
 * @param state the initial state to apply.
 */
export const withState = (state = appState): StoryDecorator => story => (
  <Provider store={createStore(state.get())}>{story()}</Provider>
)
