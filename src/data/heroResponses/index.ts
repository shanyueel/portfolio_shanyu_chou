/**
 * Server-side MDX compilation utilities
 * This file should only be imported in server components
 */
import React, { createElement } from "react"
import { compileMDX } from "next-mdx-remote/rsc"
import fs from "fs"
import path from "path"
import remarkGfm from "remark-gfm"
import { ThreeColumnSection, TwoColumnSection } from "@/components/mdx/LayoutSections"
import Quote from "@/components/mdx/Quote"
import Timeline from "@/components/ui/Timeline"
import TimelineItem from "@/components/ui/TimelineItem"
import HighlightBox from "@/components/mdx/HighlightBox"
import { StatCard, FooterLink, HeroCardContainer, TechIcon } from "@/components/mdx/HeroCards"
import Callout from "@/components/mdx/Callout"
import { LuClockArrowDown, LuCircleDollarSign, LuUsers, LuPuzzle, LuWrench, LuRocket, LuPalette, LuDatabase, LuTarget, LuNotebookPen, LuSearch, LuShieldCheck, LuLayoutDashboard, LuBot, LuSchool, LuPodcast, LuHandshake, LuPackage, LuGlobe, LuLightbulb, LuTriangleAlert, LuCalendarClock, LuCompass, LuMessagesSquare, LuGraduationCap, LuLock } from "react-icons/lu"
import type { IconType } from "react-icons"
import { heroResponseDefs } from "./responses"

/**
 * Icon map — add new icons here when needed in HighlightBox.
 * This is the ONLY place you need to update when adding a new icon.
 */
const iconMap: Record<string, IconType> = {
  LuClockArrowDown,
  LuCircleDollarSign,
  LuUsers,
  LuPuzzle,
  LuWrench,
  LuRocket,
  LuPalette,
  LuDatabase,
  LuTarget,
  LuNotebookPen,
  LuSearch,
  LuShieldCheck,
  LuLayoutDashboard,
  LuBot,
  LuSchool,
  LuPodcast,
  LuHandshake,
  LuPackage,
  LuGlobe,
  LuLightbulb,
  LuTriangleAlert,
  LuCalendarClock,
  LuCompass,
  LuMessagesSquare,
  LuGraduationCap,
  LuLock,
}

/**
 * MDX wrapper for HighlightBox that resolves iconName string → icon element.
 * This keeps HighlightBox.tsx simple (accepts ReactNode) while giving MDX
 * a clean string-based API.
 */
const HighlightBoxMDX = ({ iconName, ...props }: { iconName?: string } & React.ComponentProps<typeof HighlightBox>) => {
  const icon = iconName && iconMap[iconName] ? createElement(iconMap[iconName]) : undefined
  return createElement(HighlightBox, { ...props, icon })
}

/**
 * Compile MDX content for a hero response (Server-side only)
 */
export async function compileHeroMDX(mdxFileName: string): Promise<React.ReactElement> {
  const filePath = path.join(process.cwd(), "src", "data", "heroResponses", mdxFileName)
  const mdxSource = fs.readFileSync(filePath, "utf-8")

  const { content } = await compileMDX({
    source: mdxSource,
    components: {
      ThreeColumnSection,
      TwoColumnSection,
      Callout,
      Quote,
      Timeline,
      TimelineItem,
      HighlightBox: HighlightBoxMDX, // MDX uses this wrapper; resolves iconName → icon
      StatCard,
      FooterLink,
      HeroCardContainer,
      TechIcon,
    },
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  })

  return content
}

/**
 * Get all compiled hero responses (for pre-rendering)
 */
export async function getAllCompiledHeroResponses(): Promise<
  Record<string, React.ReactElement>
> {
  const compiled: Record<string, React.ReactElement> = {}

  for (const def of heroResponseDefs) {
    const fileName = `${def.id}.mdx`
    const filePath = path.join(process.cwd(), "src", "data", "heroResponses", fileName)

    if (fs.existsSync(filePath)) {
      compiled[def.id] = await compileHeroMDX(fileName)
    } else {
      console.warn(`MDX file not found for response: ${def.id} (expected: ${fileName})`)
    }
  }

  return compiled
}
