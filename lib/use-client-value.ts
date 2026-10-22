import * as React from "react"

const subscribeNever = () => () => {}

/**
 * A value that only exists in the browser (today's date, the URL, localStorage).
 *
 * The static export and hydration render `serverValue`; React then re-renders
 * with `read()`. Components mounted later (e.g. on a tab switch) read it on
 * their first render – no setState in an effect, no flash of the server value.
 *
 * `read` must return a primitive or a cached object: a new object on every
 * call makes React re-render endlessly.
 */
export function useClientValue<T>(read: () => T, serverValue: T): T {
  return React.useSyncExternalStore(subscribeNever, read, () => serverValue)
}
