/**
 * Resolve after `ms` milliseconds, so a pause can be written as
 * `await delay(500)` instead of a nested setTimeout callback.
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
