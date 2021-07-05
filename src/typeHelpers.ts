export type JSONValue = string | number | boolean | null | undefined | JSONObject | JSONArray
type JSONObject = { [key: string]: JSONValue }
type JSONArray = Array<JSONValue>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TAnyFunction<TReturn> = (...args: any[]) => TReturn
