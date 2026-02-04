import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
* Utility function to merge class names using clsx and tailwind-merge.
*/
export const cn = (...inputs: (string | boolean | undefined | null)[]) => {
  return twMerge(clsx(inputs));
}

/**
 * Utility function to create a delay using Promises.
 * Enables async/await pattern for better readability.
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after the specified delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Utility function to scroll to a specific element smoothly.
 * @param ref - React ref object pointing to the target element
 * @param options - Optional ScrollIntoViewOptions (defaults to smooth scroll, aligned to start)
 */
export const scrollToElement = (
  ref: React.RefObject<HTMLElement | null>,
  options?: ScrollIntoViewOptions
) => {
  ref.current?.scrollIntoView(options || { behavior: "smooth", block: "start" });
}