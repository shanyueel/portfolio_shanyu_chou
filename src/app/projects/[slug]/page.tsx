import { notFound } from "next/navigation"
import path from "path"
import fs from "fs"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypeHighlight from "rehype-highlight"
import Link from "next/link"
import projects from "@/data/projects"
import { FaUsers, FaUserTie, FaClock, FaGithub, FaPlayCircle, FaLayerGroup } from "react-icons/fa"
import AnimatedArticle from "@/components/ui/AnimatedArticle"
import { techStackMap } from "@/lib/constants"
import { pageParams, TechIconColors } from "@/lib/types"
import remark_gfm from "remark-gfm"
import ImageCarouselWrapper from "@/components/features/ImageCarouselWrapper"
import TeamMembers from "@/components/features/project/TeamMembers"

/**
 * Generate static parameters for the blog post pages to be pre-rendered.
 */
export async function generateStaticParams() {
  return projects.map(project => ({
    slug: project.slug,
  }))
}

/**
 * ProjectPage component that renders a single project based on the slug.
 */
export default async function ProjectPage(props: { params: pageParams }) {
  const { slug } = await props.params
  const post = projects.find(p => p.slug === slug)
  if (!post) return notFound()

  const filePath = path.join(process.cwd(), "src", "data", "projects", `${slug}.mdx`)
  const projectPhotoDir = path.join(process.cwd(), "public", "projects", slug)

  if (!fs.existsSync(filePath)) {
    return notFound()
  }

  const mdxSource = fs.readFileSync(filePath, "utf-8")

  const { content, frontmatter } = await compileMDX<{
    title: string
    subtitle: string
    introduction: string
    role: string
    duration: string
    techStack: Record<string, string[]>
    teamMembers?: Record<string, number>
    githubUrl?: string
    liveDemoUrl?: string
  }>({
    source: mdxSource,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remark_gfm],
        rehypePlugins: [rehypeHighlight],
      },
    },
  })

  const showLinks = frontmatter.githubUrl || frontmatter.liveDemoUrl

  return (
    <AnimatedArticle>
      <h1 className="text-3xl font-extrabold ">{frontmatter.title}</h1>
      <h3 className="text-lg mb-4 text-gray-500">{frontmatter.subtitle}</h3>

      {/* GitHub Link & Live Demo Section */}
      {showLinks && (
        <div className="flex gap-4 mb-4">
          {frontmatter.githubUrl && (
            <Link
              href={frontmatter.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center text-gray-800 dark:text-gray-100 hover:text-blue-600 transition"
            >
              <FaGithub className="mr-1.5 w-5 h-5 text-gray-700 group-hover:text-blue-600" />
              <span className="underline underline-offset-4">GitHub</span>
            </Link>
          )}
          {frontmatter.liveDemoUrl && (
            <Link
              href={frontmatter.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center text-gray-800 dark:text-gray-100 hover:text-blue-600 transition"
            >
              <FaPlayCircle className="mr-1.5 w-5 h-5 text-red-500 group-hover:text-blue-600" />
              <span className="underline underline-offset-4">Live Demo</span>
            </Link>
          )}
        </div>
      )}

      {/* Project Introduction */}
      <p className="mb-4">{frontmatter.introduction}</p>

      {/* Project Metadata */}
      <div className="mb-6 p-2 w-full bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md">
        <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 sm:text-base">
          <div className="flex items-center gap-2">
            <FaUserTie className="text-green-500" />
            <span>
              <strong>Role:</strong> {frontmatter.role}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaClock className="text-purple-500" />
            <span>
              <strong>Duration:</strong> {frontmatter.duration}
            </span>
          </div>

          {frontmatter.teamMembers && (
            <div className="col-span-1  sm:col-span-2 flex items-center gap-2">
              <FaUsers className="text-blue-500" />
              <span>
                <strong>Team:</strong>
              </span>

              <div className="flex gap-2">
                {Object.entries(frontmatter.teamMembers).map(([role, count]) => (
                  <TeamMembers key={role} role={role} count={count} />
                ))}
              </div>
            </div>
          )}

          <hr className="col-span-full border-gray-300" />

          <div className="col-span-1  sm:col-span-2">
            <div className="flex items-center gap-2">
              <FaLayerGroup className="text-gray-500" />
              <span>
                <strong>Tech Stack</strong>
              </span>
            </div>
            <div className="flex flex-col gap-1 mt-1">
              {Object.entries(frontmatter.techStack || {}).map(([category, technologies]) => (
                <div
                  key={category}
                  className="flex flex-col items-start sm:flex-row sm:items-center sm:ml-7"
                >
                  <h3 className="text-md font-bold capitalize text-gray-700 dark:text-gray-300">
                    {category}:
                  </h3>
                  <ul className="flex flex-wrap gap-x-2 gap-y-1 ml-0 sm:gap-x-4 sm:ml-2">
                    {technologies.map(tech => {
                      const { icon: Icon, color, darkColor } = techStackMap[tech]
                      return (
                        <li
                          key={tech}
                          className="flex items-center gap-2"
                          style={
                            {
                              ["--text-c"]: color,
                              ["--text-c-dark"]: darkColor ?? color,
                            } as TechIconColors
                          }
                        >
                          {Icon && (
                            <Icon
                              size={20}
                              className="text-[var(--text-c)] dark:text-[var(--text-c-dark)]"
                            />
                          )}
                          <span>{tech}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Carousel - Display project photos if available */}
      {fs.existsSync(projectPhotoDir) && fs.readdirSync(projectPhotoDir).length > 0 && (
        <div className="w-full">
          <ImageCarouselWrapper imageDir={`projects/${slug}`} altPrefix={frontmatter.title} />
        </div>
      )}

      {/* Display the actual content of the .mdx file */}
      <div className="max-w-4xl prose dark:prose-invert">{content}</div>
    </AnimatedArticle>
  )
}
