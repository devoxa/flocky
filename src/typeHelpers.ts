/* eslint-disable @typescript-eslint/no-explicit-any */

export type JSONValue = string | number | boolean | null | undefined | JSONObject | JSONArray
type JSONObject = { [key: string]: JSONValue }
type JSONArray = Array<JSONValue>

export type TAnyFunction<TReturn> = (...args: Array<any>) => TReturn

export type Simplify<T> = T extends unknown ? { [K in keyof T]: Simplify<T[K]> } : never

export type RecursiveUnionToIntersection<TObjectWithUnions> = {
  [TKey in keyof TObjectWithUnions]: TObjectWithUnions[TKey] extends object
    ? RecursiveUnionToIntersection<UnionToIntersection<TObjectWithUnions[TKey]>>
    : TObjectWithUnions[TKey]
}

export type UnionToIntersection<TUnion> = (
  TUnion extends any ? (k: TUnion) => void : never
) extends (k: infer TIntersection) => void
  ? TIntersection
  : never
