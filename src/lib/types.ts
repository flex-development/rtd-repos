import type { AxiosRequestConfig } from 'axios'
import type { PlainObject } from 'simplytyped'

/**
 * @file Globals - Type Definitions
 * @module lib/types
 */

/**
 * Type representing any value.
 */
export type ANY = any

/**
 * Readonly properties of all entities.
 *
 * The `created_at` and `id` fields cannot be overwritten; whereas `updated_at`
 * can only be updated internally by the `EntityRepository` class.
 */
export type EntityReadonlyProps = 'created_at' | 'id' | 'updated_at'

/**
 * Type representing a `number` or `string`.
 */
export type NumberString = number | string

/**
 * Type representing any string that can also be null.
 */
export type NullishString = string | null

/**
 * Type representing a deeply nested or top level object key.
 *
 * @template T - Object
 *
 * See: https://github.com/ghoullier/awesome-template-literal-types
 */
export type ObjectPath<T> = ObjectPathNT<T> extends string | keyof T
  ? ObjectPathNT<T>
  : keyof T

/**
 * Type representing a deeply nested object key or `never` if the key in
 * question does on exist on {@template T}.
 *
 * @template T - Object
 * @template K - Nested object key
 *
 * - https://github.com/ghoullier/awesome-template-literal-types#dot-notation-string-type-safe
 */
export type ObjectPathN<T, K extends keyof T> = K extends string
  ? T[K] extends PlainObject
    ?
        | `${K}.${ObjectPathN<T[K], Exclude<keyof T[K], keyof any[]>> & string}`
        | `${K}.${Exclude<keyof T[K], keyof any[]> & string}`
    : never
  : never

/**
 * Type representing a deeply nested object key, or top level key if the key in
 * question does on exist on {@template T}.
 *
 * @template T - Object
 *
 * - https://github.com/ghoullier/awesome-template-literal-types#dot-notation-string-type-safe
 */
export type ObjectPathNT<T> = ObjectPathN<T, keyof T> | keyof T

/**
 * Type representing an object value.
 *
 * @template T - Object
 * @template P - Deeply nested or top level object path
 *
 * - https://github.com/ghoullier/awesome-template-literal-types#dot-notation-string-type-safe
 */
export type ObjectPathValue<
  T,
  P extends ObjectPath<T>
> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends ObjectPath<T[Key]>
      ? ObjectPathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never

/**
 * Type that accepts one piece of data or an array of data.
 */
export type OneOrMany<T = ANY> = T | Array<T>

/**
 * Represents data returned by a function, or the return type of a function that
 * never returns a value because an error was thrown.
 */
export type OrNever<T = any> = T | never

/**
 * Type representing an asynchronous or synchronous value.
 */
export type OrPromise<T = any> = T | Promise<T>

/**
 * Omit certain fields while making others optional.
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Make certain fields required while making others required.
 */
export type PartialByRequired<T, K extends keyof T> = Pick<T, K> &
  Partial<Omit<T, K>>

/**
 * Type allowing all properties of T or some properties of T.
 */
export type PartialOr<T = PlainObject> = T | Partial<T>

/**
 * HTTP client used to make requests to the Firebase Database REST API.
 */
export type RTDRepoHttpClient<T = any> = {
  (config: AxiosRequestConfig): Promise<{ data: T }>
}
