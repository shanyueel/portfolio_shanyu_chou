"use client"

import { useRef } from "react"
import AIHeroSection from "./AIHeroSection"
import ProjectsSection from "./ProjectsSection"
import type { Project } from "@/data/projects"

interface HomePageWrapperProps {
  compiledResponses: Record<string, React.ReactNode>
  projects: Project[]
}

/**
 * Client component wrapper to manage cross-component refs
 * Allows AIHeroSection to scroll to ProjectsSection
 */
export default function HomePageWrapper({ compiledResponses, projects }: HomePageWrapperProps) {
  const projectsSectionRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* Hero Section - Contains client-side interactivity */}
      <AIHeroSection compiledResponses={compiledResponses} projectsSectionRef={projectsSectionRef} />

      {/* Projects Section - Server-rendered with client animations */}
      <ProjectsSection projects={projects} ref={projectsSectionRef} />
    </>
  )
}
