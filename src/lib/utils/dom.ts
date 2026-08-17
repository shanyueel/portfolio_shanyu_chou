/**
 * Scroll a ref'd element into view, defaulting to a smooth top-aligned scroll.
 * No-ops safely when the ref is not yet attached.
 *
 * @param ref - React ref pointing at the target element
 * @param options - Overrides for the default ScrollIntoViewOptions
 */
export const scrollToElement = (
  ref: React.RefObject<HTMLElement | null>,
  options?: ScrollIntoViewOptions,
) => {
  ref.current?.scrollIntoView(options || { behavior: "smooth", block: "start" })
}
