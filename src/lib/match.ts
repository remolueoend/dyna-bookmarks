type DefaultValue<T, R> = R | ((value: T) => R)

/**
 * Simulates a match statement by accepting a list of cases as tuples, each with a possible match and a value
 * (match, value). `match` returns a function accepting a value to match against and returning the value of the matched case.
 * Returns `undefined` if no case matched.
 *
 * @export
 * @template T
 * @template R
 * @param {Array<[T, R]>} cases
 * @returns {((value: T) => R | undefined)}
 */
export function match<T, R>(cases: Array<[T, R]>): (value: T) => R | undefined
/**
 * Simulates a match statement by accepting a list of cases as tuples, each with a possible match and a value
 * (match, value). `match` returns a function accepting a value and default value  to match against and returning the value of the matched case.
 * Returns the given default value if no case matched.
 *
 * @export
 * @template T
 * @template R
 * @param {Array<[T, R]>} cases
 * @param R defaultValue default value to use or function returning a default value.
 * @returns {((value: T) => R | undefined)}
 */
export function match<T, R>(
  cases: Array<[T, R]>,
  defaultValue: DefaultValue<T, R>,
): (value: T) => R
export function match<T, R>(
  cases: Array<[T, R]>,
  defaultValue?: DefaultValue<T, R>,
): (value: T) => R | undefined {
  return value => {
    const matchedValue = cases.find(([caseMatch]) => caseMatch === value)
    if (!!matchedValue) {
      return matchedValue[1]
    } else if (typeof defaultValue !== "undefined") {
      return typeof defaultValue === "function"
        ? // required casting, because `R` itself could also by of type function:
          (defaultValue as (value: T) => R)(value)
        : defaultValue
    }
    return undefined
  }
}
