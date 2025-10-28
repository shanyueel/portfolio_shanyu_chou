"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import blog from "@/data/blog"
import projects from "@/data/projects"
import work from "@/data/work"
import Logo from "@/assets/icons/logo.svg"

const Breadcrumbs = () => {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const allowedRoots = ["projects", "work" /* , "blog" */]
  const isAllowed = segments.length > 0 && allowedRoots.includes(segments[0])

  // Validate subpath: only show breadcrumbs if the path exists
  let showBreadcrumbs = false
  if (isAllowed) {
    if (segments.length === 1) {
      // Only /blog, /projects, /work
      showBreadcrumbs = true
    } else if (segments.length === 2) {
      // Dynamically get valid slugs from imported data
      const validSlugs: Record<string, string[]> = {
        blog: blog.map(item => item.slug),
        projects: projects.map(item => item.slug),
        work: work.map(item => item.slug),
      }
      showBreadcrumbs = validSlugs[segments[0]].includes(segments[1])
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 my-auto text-lg text-dark dark:text-light">
        <Link href="/" className="group flex items-center gap-2 font-semibold hover:text-link">
          <Logo className="w-8 h-8 text-primary group-hover:text-link" />
          {/* Initials on mobile */}
          <span className="block md:hidden">SC</span>
          {/* Full name on desktop */}
          <span className="hidden md:inline">Shan-Yu Chou</span>
        </Link>

        {/* Crumbs part: show only on mobile, not on desktop */}
        <span className="flex md:hidden items-center gap-1">
          {showBreadcrumbs &&
            segments.map((segment, index) => {
              const href = "/" + segments.slice(0, index + 1).join("/")
              const label = segment
                .replace(/[-_]/g, " ") // Replace hyphens/underscores with spaces
                .replace(/\b\w/g, letter => letter.toUpperCase()) // Capitalize first letter of each word

              return (
                <span key={href} className="flex items-center gap-1 text-lg">
                  <span className="text-muted">/</span>
                  <Link
                    href={href}
                    className="text-dark dark:text-light hover:text-link transition-colors"
                  >
                    {label}
                  </Link>
                </span>
              )
            })}
        </span>
      </div>
    </div>
  )
}

export default Breadcrumbs
