"use client"

import { useState, useMemo } from "react"
import { FaFrown } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import projects from "@/data/projects"
import FilterDropdown from "@/components/features/FilterDropdown"
import SortDropdown from "@/components/features/SortDropdown"
import ActiveFilterChips from "@/components/features/ActiveFilterChips"
import ProjectCard from "@/components/features/ProjectCard"

/**
 * ProjectsPage component that serves as the main page for displaying projects.
 * This is accessed at the "/projects" URL of the application.
 */
const ProjectsPage = () => {
  const [techStackDrafts, setTechStackDrafts] = useState<string[]>([])
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<"oldest" | "newest">("newest")

  // Memoized unique tech stack list with counts to avoid recalculating on every render
  const uniqueTechStack = useMemo(() => {
    const techStackCounts: Record<string, number> = {}

    for (const project of projects) {
      if (!project.techStack || project.techStack.length === 0) continue

      project.techStack.forEach(tech => {
        techStackCounts[tech] = (techStackCounts[tech] || 0) + 1
      })
    }

    return Object.entries(techStackCounts)
      .map(([tech, count]) => ({ tech, count }))
      .sort((a, b) => a.tech.localeCompare(b.tech))
  }, [])

  const applyFilters = () => {
    setSelectedTechStack([...techStackDrafts])
  }

  const clearFilters = () => {
    setSelectedTechStack([])
    setTechStackDrafts([])
  }

  // Handler to remove a single tech from filters
  const removeTech = (tech: string) => {
    setSelectedTechStack(prev => prev.filter(t => t !== tech))
    setTechStackDrafts(prev => prev.filter(t => t !== tech))
  }

  // Memoized filtered projects based on selected tech stack and sort order
  const filteredProjects = useMemo(() => {
    const filtered = projects.filter(
      project =>
        selectedTechStack.length === 0 ||
        (project.techStack && selectedTechStack.some(tech => project.techStack.includes(tech)))
    )

    return filtered.sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.endDate || "").getTime() - new Date(a.endDate || "").getTime()
      } else {
        return new Date(a.startDate || "").getTime() - new Date(b.startDate || "").getTime()
      }
    })
  }, [selectedTechStack, sortOrder])

  return (
    <section className="max-w-4xl mx-auto">
      <div className="main-container">
        <div className="flex justify-between items-center gap-4 w-full mb-4">
          <FilterDropdown
            items={uniqueTechStack.map(({ tech, count }) => ({
              id: tech,
              label: `${tech} (${count})`,
            }))}
            selectedItems={techStackDrafts}
            setSelectedItems={setTechStackDrafts}
            onApply={applyFilters}
            onClear={clearFilters}
            placeholder="Filter by Tech"
            resultCount={filteredProjects.length}
          />
          <SortDropdown
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            options={[
              { label: "Newest First", id: "newest" },
              { label: "Oldest First", id: "oldest" },
            ]}
          />
        </div>

        {/* Active Filter Chips */}
        <ActiveFilterChips filters={selectedTechStack} className="mb-4" onRemove={removeTech} />

        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="projects"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filteredProjects.map(project => (
                <ProjectCard key={project.slug} {...project} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              className="flex flex-col items-center mt-12 px-4 text-center text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <FaFrown className="mb-3 text-4xl text-gray-400 md:text-5xl dark:text-gray-500" />
              <p className="text-lg font-semibold md:text-xl lg:text-2xl">No matched projects</p>
              <p className="text-sm md:text-base lg:text-lg mt-2 max-w-2xl">
                The combination of selected tech stack filters didn&apos;t match any projects. Try
                changing or clearing your filters.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ProjectsPage
