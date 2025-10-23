"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"
import { navItems } from "@/lib/constants"

const NavigationMenu = () => {
  const pathname = usePathname()

  const filteredNavItems = navItems.filter(item => item.name !== "Home")

  return (
    <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <ul className="flex items-center justify-center gap-0.5 bg-white/80 dark:bg-black/40 relative min-h-0">
        {filteredNavItems.map(({ name, path }, idx) => {
          const isActive = pathname === path
          const showDivider = idx < filteredNavItems.length - 1

          return (
            <Fragment key={name}>
              <li className="relative z-10 flex justify-center items-center">
                <Link
                  href={path}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex items-center justify-center px-3 py-1.5 font-medium text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-500 min-w-[72px] text-ellipsis whitespace-nowrap overflow-hidden hover:underline hover:underline-offset-6 hover:decoration-3
                    ${isActive ? "text-blue-600 dark:text-blue-400 decoration-3 underline underline-offset-6 font-semibold" : "text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:font-medium"}
                  `}
                >
                  {name}
                </Link>
              </li>
              {showDivider && (
                <li className="mx-0.5 h-5 w-px" aria-hidden="true">
                  |
                </li>
              )}
            </Fragment>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavigationMenu
