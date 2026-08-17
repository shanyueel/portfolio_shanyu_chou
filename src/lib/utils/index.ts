/**
 * Barrel for the general-purpose helpers used throughout the app, so the
 * long-standing `@/lib/utils` import path keeps working.
 *
 * Re-exports are named rather than `export *` so this file doubles as the map
 * of what lives where.
 *
 * Specialised modules are deliberately NOT re-exported here — import them by
 * path, so a component pulling in vector maths or an HTTP client is obvious at
 * the import line:
 *
 *   @/lib/utils/binary   base64 <-> Int8Array
 *   @/lib/utils/vector   cosine, normalize
 *   @/lib/utils/http     createFetcher
 */
export { cn } from "./styles"
export { delay } from "./async"
export { scrollToElement } from "./dom"
