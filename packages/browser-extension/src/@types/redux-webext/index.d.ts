declare module 'redux-webext' {
  import { Store, ActionCreator } from 'redux'

  export interface CreateBackgroundStoreOptions<TState> {
    store: Store<TState>
    actions?: {
      [actionType: string]: ActionCreator<unknown>
    }
  }

  export function createUIStore<TState>(): Store<TState>
  export function createBackgroundStore<TState>(
    options: CreateBackgroundStoreOptions<TState>,
  ): Store<TState>
}
