import { notFound } from "next/navigation"
import path from "path"
import fs from "fs"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypeHighlight from "rehype-highlight"
import work from "@/data/work"
import AnimatedArticle from "@/components/ui/AnimatedArticle"
import { techStackMap } from "@/lib/constants"
import { Timeline, TimelineItem } from "@/components/mdx/Timeline"
import { pageParams, TechIconColors } from "@/lib/types"
import BackToPageButton from "@/components/ui/BackToPageButton"
import remark_gfm from "remark-gfm"

/**
 * Generate static parameters for the work item pages to be pre-rendered.
 */
export async function generateStaticParams() {
  return work.map(item => ({
    slug: item.slug,
  }))
}

/**
 * WorkItemPage component that renders a single work item based on the slug.
 */
export default async function WorkItemPage(props: { params: pageParams }) {
  const { slug } = await props.params
  const post = work.find(w => w.slug === slug)
  if (!post) return notFound()

  const filePath = path.join(process.cwd(), "src", "data", "work", `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return notFound()
  }

  const mdxSource = fs.readFileSync(filePath, "utf-8")

  const { content, frontmatter } = await compileMDX<{
    name: string
    highlight: string
    description: string
    techStack: string[]
    toolsUsed: string[]
  }>({
    source: mdxSource,
    components: {
      Timeline,
      TimelineItem,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remark_gfm],
        rehypePlugins: [rehypeHighlight],
      },
    },
  })

  return (
    <AnimatedArticle>
      <BackToPageButton pageUrl="/work" />
      <h1 className="text-4xl font-bold mb-2">{frontmatter.name}</h1>
      <p className="text-lg text-gray-600 mb-6">{frontmatter.description}</p>

      <h2 className="my-4 italic">&quot;{frontmatter.highlight}&quot;</h2>

      <h2 className="text-xl font-semibold mb-6">Tech Stack & Tools used</h2>
      <div className="flex flex-wrap gap-4">
        {frontmatter.techStack?.map(tech => {
          const { icon: Icon, color, darkColor } = techStackMap[tech]

          return (
            <div
              key={tech}
              className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-sm"
              style={
                {
                  ["--text-c"]: color,
                  ["--text-c-dark"]: darkColor ?? color,
                } as TechIconColors
              }
            >
              {Icon && (
                <Icon size={20} className="text-[var(--text-c)] dark:text-[var(--text-c-dark)]" />
              )}
              <span>{tech}</span>
            </div>
          )
        })}
      </div>
      <hr className="w-full my-4 border-1 border-gray-300" />
      <div className="flex flex-wrap gap-4 mb-8">
        {frontmatter.toolsUsed?.map(tool => {
          const { icon: Icon, color } = techStackMap[tool]

          return (
            <div
              key={tool}
              className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-sm"
            >
              {Icon && <Icon style={{ width: "20px", height: "20px", color }} />}
              <span>{tool}</span>
            </div>
          )
        })}
      </div>

      <div className="max-w-5xl prose dark:prose-invert">{content}</div>
    </AnimatedArticle>
  )
}
