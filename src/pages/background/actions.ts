export function incrementBackgroundCounter() {
  return { type: 'INCREMENT_BACKGROUND_COUNTER', payload: 1 }
}

export function decrementBackgroundCounter() {
  return { type: 'DECREMENT_BACKGROUND_COUNTER', payload: 1 }
}

export function incrementUICounter({ payload }: { payload: number }) {
  return {
    type: 'INCREMENT_UI_COUNTER',
    payload,
  }
}

export function decrementUICounter({ payload }: { payload: number }) {
  return {
    type: 'DECREMENT_UI_COUNTER',
    payload,
  }
}
