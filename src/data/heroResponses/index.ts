/**
 * Server-side MDX compilation utilities
 * This file should only be imported in server components
 */
import { compileMDX } from "next-mdx-remote/rsc"
import fs from "fs"
import path from "path"
import remarkGfm from "remark-gfm"
import Grid from "@/components/mdx/Grid"
import { StatCard, FooterLink, HeroCardContainer, TechIcon } from "@/components/mdx/HeroCards"
import { SiReact, SiVuedotjs, SiTypescript, SiTailwindcss, SiStorybook } from "react-icons/si"
import { GiPineapple } from "react-icons/gi"
import { heroResponseDefs } from "./responses"

/**
 * Compile MDX content for a hero response (Server-side only)
 */
export async function compileHeroMDX(mdxFileName: string): Promise<React.ReactElement> {
  const filePath = path.join(process.cwd(), "src", "data", "heroResponses", mdxFileName)
  const mdxSource = fs.readFileSync(filePath, "utf-8")

  const { content } = await compileMDX({
    source: mdxSource,
    components: {
      Grid,
      StatCard,
      FooterLink,
      HeroCardContainer,
      TechIcon,
      // Icons
      SiReact,
      SiVuedotjs,
      SiTypescript,
      SiTailwindcss,
      SiStorybook,
      GiPineapple,
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
    
    // Check if file exists before attempting to compile
    if (fs.existsSync(filePath)) {
      compiled[def.id] = await compileHeroMDX(fileName)
    } else {
      console.warn(`MDX file not found for response: ${def.id} (expected: ${fileName})`)
    }
  }

  return compiled
}
