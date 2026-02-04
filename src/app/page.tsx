import HomePageWrapper from "@/app/_components/HomePageWrapper"
import BlogSection from "@/app/_components/BlogSection"
import AboutSection from "@/app/_components/AboutSection"
import blog from "@/data/blog"
import projects from "@/data/projects"
import { getAllCompiledHeroResponses } from "@/data/heroResponses"
import type { Metadata } from "next"

/**
 * Metadata for SEO optimization
 * This will be rendered in the HTML head on the server
 */
export const metadata: Metadata = {
  title: "Shan-Yu Chou - Frontend Engineer | Portfolio",
  description:
    "Frontend Engineer with 2 years of experience specializing in TypeScript, React, and Vue. Design-driven developer creating intuitive user experiences. Currently seeking new opportunities.",
  keywords: [
    "Frontend Engineer",
    "React Developer",
    "TypeScript",
    "Vue.js",
    "Web Development",
    "UI/UX",
    "Portfolio",
    "Shan-Yu Chou",
  ],
  authors: [{ name: "Shan-Yu Chou" }],
  openGraph: {
    title: "Shan-Yu Chou - Frontend Engineer",
    description:
      "Frontend Engineer with 2 years of experience specializing in TypeScript, React, and Vue.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shan-Yu Chou - Frontend Engineer",
    description:
      "Frontend Engineer with 2 years of experience specializing in TypeScript, React, and Vue.",
  },
}

/**
 * Home page component - Server Side 
 * This is accessed at the root URL ("/") of the application.
 */
export default async function Homepage() {
  // Fetch all data on the server side
  const compiledResponses = await getAllCompiledHeroResponses()

  return (
    <section className="max-w-4xl mx-auto">
      {/* Hero and Projects Sections - Wrapped to share scroll ref */}
      <HomePageWrapper compiledResponses={compiledResponses} projects={projects} />

      {/* Blog Section - Server-rendered with client animations */}
      <BlogSection blog={blog} />

      {/* About Section - Server-rendered with client animations */}
      <AboutSection />
    </section>
  )
}
