/**
 * Returns a new type based on type `T`, exluding all properties in union type `K`.
 *
 * @template T base type
 * @template K union type extending keys of type `T`.
 *
 * @example
 * type T = Omit<{foo: string, baz: number}, "foo"> // {baz: number}
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * Returns a new type based on type `T`, exluding all properties defined by type `U`.
 *
 * @template T base type
 * @template U type describing properties to exlude.
 *
 * @example
 * type T = OmitProps<{foo: string, baz: number}, {foo: string}> // {baz: number}
 */
export type OmitProps<T extends U, U> = Omit<T, keyof U>
