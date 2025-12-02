import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
* Utility function to merge class names using clsx and tailwind-merge.
*/
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}