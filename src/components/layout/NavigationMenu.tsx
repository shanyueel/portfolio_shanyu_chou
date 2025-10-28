"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"
import { navItems } from "@/lib/constants"

const NavigationMenu = () => {
  const pathname = usePathname()

  const filteredNavItems = navItems.filter(item => item.name !== "Home")

  return (
    <nav className="absolute top-1/2 left-1/2 hidden md:block transform -translate-x-1/2 -translate-y-1/2">
      <ul className="relative flex items-center justify-center gap-1 min-h-0">
        {filteredNavItems.map(({ name, path }, idx) => {
          const isActive = pathname === path
          const showDivider = idx < filteredNavItems.length - 1

          return (
            <Fragment key={name}>
              <li className="relative z-10 flex justify-center items-center">
                <Link
                  href={path}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex justify-center items-center px-3 font-bold text-center transition-all duration-200 text-black dark:text-white
                    ${isActive ? "text-link font-semibold" : " hover:text-link hover:font-bold"}
                  `}
                >
                  {name}
                </Link>
              </li>
              {showDivider && (
                <li className="w-px h-5" aria-hidden="true">
                  <span className="inline-flex items-center w-full h-full bg-dark"></span>
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
