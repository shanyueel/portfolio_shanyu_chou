import { forwardRef } from "react"
import ViewAllHeader from "@/components/layout/ViewAllHeader"
import ProjectCard from "@/components/features/ProjectCard"
import { FadeInUpOnScroll } from "@/components/animations"
import type { Project } from "@/data/projects"

interface ProjectsSectionProps {
  projects: Project[]
}

/**
 * Projects Section
 * Display
 */
const ProjectsSection = forwardRef<HTMLDivElement, ProjectsSectionProps>(
  ({ projects }, ref) => {
    return (
      <FadeInUpOnScroll ref={ref} className="main-content mt-12 scroll-mt-header">
        <ViewAllHeader title="Recent Projects" pageUrl="/projects" itemCount={projects.length} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {projects.slice(0, 4).map((proj, index) => (
            <ProjectCard
              key={proj.slug}
              {...proj}
              priority={index < 2}
            />
          ))}
        </div>
      </FadeInUpOnScroll>
    )
  }
)

ProjectsSection.displayName = "ProjectsSection"

export default ProjectsSection
