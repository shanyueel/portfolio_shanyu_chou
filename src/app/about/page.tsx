import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import path from "path"
import fs from "fs"
import remark_gfm from "remark-gfm"
import {
  FaDownload,
  FaShapes,
  FaUsers,
  FaSearch,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa"
import ProfileHero from "@/components/features/about/ProfileHero"
import EducationSection from "@/components/features/about/EducationSection"
import ValueCard from "@/components/features/about/ValueCard"
import SocialLinks from "@/components/features/about/SocialLinks"
import Card from "@/components/mdx/Card"
import Grid from "@/components/mdx/Grid"
import Callout from "@/components/mdx/Callout"
import Divider from "@/components/ui/Divider"
import Tag from "@/components/ui/Tag"
import AnimatedArticle from "@/components/ui/AnimatedArticle"
import Timeline from "@/components/ui/Timeline"
import TimelineItem from "@/components/ui/TimelineItem"

export default async function AboutPage() {
  const filePath = path.join(process.cwd(), "src", "data", "about", "about.mdx")

  if (!fs.existsSync(filePath)) {
    return notFound()
  }

  const mdxSource = fs.readFileSync(filePath, "utf-8")

  const { content } = await compileMDX<{
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
      ProfileHero,
      EducationSection,
      ValueCard,
      SocialLinks,
      Card,
      Grid,
      Callout,
      Tag,
      Divider,
      Timeline,
      TimelineItem,
      FaDownload,
      FaShapes,
      FaUsers,
      FaSearch,
      FaGithub,
      FaLinkedin,
      FaEnvelope,
    },
    options: {
      mdxOptions: {
        remarkPlugins: [remark_gfm],
      },
    },
  })

  return (
    <div className="main-content">
      <AnimatedArticle>
        <div className="max-w-4xl prose prose-h2:mt-8 prose-h3:text-base dark:prose-invert">
          {content}
        </div>
      </AnimatedArticle>
    </div>
  )
}
