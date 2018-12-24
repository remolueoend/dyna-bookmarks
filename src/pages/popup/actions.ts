export function incrementUICounter() {
  return {
    type: 'INCREMENT_UI_COUNTER',
    payload: 3,
  }
}

export function decrementUICounter() {
  return {
    type: 'DECREMENT_UI_COUNTER',
    payload: 3,
  }
}
