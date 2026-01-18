import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import path from "path"
import fs from "fs"
import remark_gfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { FaUsers, FaUserTie, FaClock, FaGithub, FaPlayCircle, FaLayerGroup } from "react-icons/fa"
import projects from "@/data/projects"
import { techStackMap, TechKey } from "@/lib/constants"
import { pageParams, TechIconColors } from "@/lib/types"
import TeamMembers from "@/components/features/project/TeamMembers"
import Button from "@/components/ui/Button"
import Divider from "@/components/ui/Divider"
import Timeline from "@/components/ui/Timeline"
import TimelineItem from "@/components/ui/TimelineItem"
import AnimatedArticle from "@/components/ui/AnimatedArticle"
import Card from "@/components/mdx/Card"
import ImageCard from "@/components/mdx/ImageCard"
import Callout from "@/components/mdx/Callout"
import Quote from "@/components/mdx/Quote"
import Grid from "@/components/mdx/Grid"

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
const ProjectPage = async (props: { params: pageParams }) => {
  const { slug } = await props.params

  const project = projects.find(p => p.slug === slug)
  if (!project) return notFound()

  const filePath = path.join(process.cwd(), "src", "data", "projects", `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return notFound()
  }

  const mdxSource = fs.readFileSync(filePath, "utf-8")

  const { content, frontmatter } = await compileMDX<{
    title: string
    subtitle: string
    coverImage: string
    role: string
    duration: string
    techStack: Record<string, string[]>
    impacts: Record<string, string>
    teamMembers?: Record<string, number>
    githubUrl?: string
    liveDemoUrl?: string
  }>({
    source: mdxSource,
    components: {
      Timeline,
      TimelineItem,
      ImageCard,
      Card,
      Callout,
      Quote,
      Divider,
      Grid,
    },
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
    <div className="main-content">
      <AnimatedArticle>
        <div className="mb-4">
          <h1 className="text-2xl font-extrabold text-center md:text-3xl">{frontmatter.title}</h1>
          <h3 className="text-base text-center text-gray-400">{frontmatter.subtitle}</h3>
        </div>

        {/* GitHub Link & Live Demo Section */}
        {showLinks && (
          <div className="flex gap-4 mb-4">
            {frontmatter.githubUrl && (
              <Link
                href={frontmatter.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-800 transition hover:text-link dark:text-gray-100"
              >
                <Button color="info">
                  <FaGithub className="w-5 h-5 mr-1.5 text-light" size={10} />
                  <span>GitHub Repo</span>
                </Button>
              </Link>
            )}
            {frontmatter.liveDemoUrl && (
              <Link
                href={frontmatter.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-800 transition hover:text-link dark:text-gray-100"
              >
                <Button color="danger">
                  <FaPlayCircle className="w-5 h-5 mr-1.5 text-light" size={10} />
                  <span>Live Demo</span>
                </Button>
              </Link>
            )}
          </div>
        )}

        {/* Cover Image */}
        <div className="relative rounded-lg w-full aspect-video overflow-hidden mb-6">
          <Image
            src={frontmatter.coverImage}
            alt={`${frontmatter.title} Cover Image`}
            className="object-cover"
            fill
            quality={75}
          />
        </div>

        {/* Project Metadata */}
        <Callout className="mb-6">
          <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 sm:text-base">
            <div className="flex items-center gap-2">
              <FaUserTie className="text-secondary" />
              <span>
                <strong>Role:</strong> {frontmatter.role}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaClock className="text-secondary" />
              <span>
                <strong>Duration:</strong> {frontmatter.duration}
              </span>
            </div>

            {frontmatter.teamMembers && (
              <div className="col-span-1  sm:col-span-2 flex items-center gap-2">
                <FaUsers className="text-secondary" />
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

            <Divider className="col-span-full" gap={0} />

            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center gap-2">
                <FaLayerGroup className="text-primary" />
                <span>
                  <strong>Tech Stack</strong>
                </span>
              </div>
              <div className="flex flex-col gap-2 mt-1">
                {Object.entries(frontmatter.techStack || {}).map(([category, technologies]) => (
                  <div
                    key={category}
                    className="flex flex-col gap-1 items-start sm:flex-row sm:items-center sm:ml-7"
                  >
                    <h3 className="text-md font-semibold text-gray-700 capitalize dark:text-gray-300">
                      {category}
                    </h3>
                    <div className="ml-0 pl-2 border-l-2 border-gray-300 sm:ml-2">
                      <ul className="flex flex-wrap gap-x-2 gap-y-1 sm:gap-x-4">
                        {technologies.map(tech => {
                          const { icon: Icon, color, darkColor } = techStackMap[tech as TechKey]
                          return (
                            <li
                              key={tech}
                              className="flex items-center gap-1 text-sm"
                              style={
                                {
                                  ["--text-c"]: color,
                                  ["--text-c-dark"]: darkColor ?? color,
                                } as TechIconColors
                              }
                            >
                              {Icon && (
                                <Icon
                                  size={16}
                                  className="text-[var(--text-c)] dark:text-[var(--text-c-dark)]"
                                />
                              )}
                              <span>{tech}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Callout>

        {/* Display the actual content of the .mdx file */}
        <div className="max-w-4xl prose prose-h2:mt-8 prose-h3:text-base dark:prose-invert">
          {content}
        </div>
      </AnimatedArticle>
    </div>
  )
}

export default ProjectPage
