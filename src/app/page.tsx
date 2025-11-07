"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import type { IconType } from "react-icons"
import {
  FaMapMarkerAlt,
  FaLanguage,
  FaUniversity,
  FaBuilding,
  FaPaintBrush,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa"
import { HiDownload } from "react-icons/hi"
import { AiFillMessage } from "react-icons/ai"
import Lottie from "lottie-react"
import { motion, AnimatePresence } from "framer-motion"
import { techStackMap } from "@/lib/constants"
import { TechIconColors } from "@/lib/types"
import blog from "@/data/blog"
import projects from "@/data/projects"
import work from "@/data/work"
import Button from "@/components/ui/Button"
import WorkItem from "@/components/features/WorkItem"
import ProjectCard from "@/components/features/ProjectCard"
import BlogPost from "@/components/features/BlogPost"
import ViewAllHeader from "@/components/layout/ViewAllHeader"
import Logo from "@/assets/icons/logo.svg"
import scrollDownArrows from "@/assets/animations/scrollDownArrows.json"

interface Fact {
  icon: IconType
  label: string
}

/**
 * Home component that serves as the main landing page for the portfolio.
 * This is accessed at the root URL ("/") of the application.
 */
export default function Home() {
  const ProjectsRef = useRef<HTMLDivElement>(null)

  const getTimeSafe = (dateStr: string | undefined) => {
    const date = new Date(dateStr ?? "")
    return isNaN(date.getTime()) ? 0 : date.getTime()
  }

  const characteristics: string[] = [
    "design-driven",
    "detail-oriented",
    "collaborative",
    "growth-minded",
  ]
  const [charIndex, setCharIndex] = useState(0)

  const facts: Fact[] = [
    { icon: FaCode, label: "Frontend Engineer" },
    { icon: FaPaintBrush, label: "Design Background" },
    { icon: FaBuilding, label: "Wabow Information Inc." },
    { icon: FaUniversity, label: "CS Student @ Oregon State Univ." },
    { icon: FaLanguage, label: "ZH-Native | EN-Fluent" },
    { icon: FaMapMarkerAlt, label: "Taipei, Taiwan" },
  ]

  const techStack: string[] = [
    "React",
    "Vue",
    "TypeScript",
    "Python",
    "TailwindCSS",
    "Git",
    "Firebase",
  ]

  const scrollToArea = (TargetRef: React.RefObject<HTMLDivElement>) => {
    TargetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  useEffect(() => {
    const charInterval = setInterval(() => {
      setCharIndex(i => (i + 1) % characteristics.length)
    }, 2000)
    return () => clearInterval(charInterval)
  })

  return (
    <section className="max-w-4xl mx-auto">
      {/* Intro Cover Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="main-container flex flex-col h-full-container text-center"
      >
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2 md:flex-row md:gap-12">
            <Logo className="w-[180px] h-[180px] text-primary md:w-[320px] md:h-[320px]" />

            <div className="text-2xl font-bold text-gray-900 text-left md:text-4xl dark:text-gray-100">
              <h3>Hi, I&#39;m</h3>
              <h1 className="text-4xl text-primary md:text-6xl">Shan-Yu Chou,</h1>
              <h3>a Frontend Engineer</h3>
              <h3>
                who&#39;s
                <span className="relative h-[1em] ml-2 text-secondary whitespace-nowrap align-baseline overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={characteristics[charIndex]}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="absolute top-0 left-0"
                    >
                      {characteristics[charIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h3>
            </div>
          </div>

          <div className="flex gap-2 mt-2 md:gap-4">
            <Button color="primary" className="flex-1 flex items-center gap-1">
              <AiFillMessage size={16} />
              Contact Me
            </Button>
            <Button color="secondary" className="flex-1 flex items-center gap-1">
              <HiDownload size={16} />
              Download CV
            </Button>
          </div>

          <div className="flex justify-center gap-6 mt-4 text-xl">
            <Link
              href="https://github.com/shanyueel"
              aria-label="GitHub"
              className="transition-transform duration-200 hover:text-primary hover:scale-125"
            >
              <FaGithub size={24} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/shanyu-chou/"
              aria-label="LinkedIn"
              className="transition-transform duration-200 hover:text-primary hover:scale-125"
            >
              <FaLinkedin size={24} />
            </Link>
            <Link
              href="mailto:wulingkevin0704@gmail.com"
              target="_blank"
              aria-label="Email"
              className="transition-transform duration-200 hover:text-primary hover:scale-125"
            >
              <FaEnvelope size={24} />
            </Link>
          </div>
        </div>

        <button
          className="mx-auto mb-4 cursor-pointer md:mb-6"
          onClick={() => scrollToArea(ProjectsRef)}
        >
          <Lottie animationData={scrollDownArrows} loop={true} className="w-[50px] h-[50px]" />
        </button>
      </motion.div>

      {/* Recent Projects */}
      <motion.div
        ref={ProjectsRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        className="main-container h-full-container mt-12 scroll-mt-header"
      >
        <ViewAllHeader title="Recent Projects" pageUrl="/projects" itemCount={projects.length} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {projects.slice(0, 4).map((proj, index) => {
            const filteredTechStack = proj.techStack.filter(
              (tech): tech is string => typeof tech === "string"
            )
            return (
              <ProjectCard
                key={proj.slug}
                {...proj}
                techStack={filteredTechStack}
                priority={index < 2}
              />
            )
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="main-container h-full-container mt-2 text-center scroll-mt-header"
      >
        <div className="flex flex-wrap justify-center gap-3 mt-4 px-2 max-w-4xl mx-auto">
          {facts.map((fact, i) => {
            const Icon = fact.icon
            return (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800
                                text-sm text-gray-700 dark:text-gray-300 rounded-full shadow-md transition"
              >
                <Icon className="text-blue-500 dark:text-blue-400 text-base" />
                <span>{fact.label}</span>
              </div>
            )
          })}
        </div>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-left mb-6 mt-6">
          A collaborative and detail-oriented Front-End Engineer with 3+ years of professional
          experience, including 2 years in a dynamic e-commerce team at Wabow Information Inc.
        </p>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-left">
          Leverages a background in Industrial Design to build intuitive and engaging user
          experiences with Typescript, Vue, and React. A quick learner adept at writing clean,
          robust, and maintainable code to solve complex problems and deliver high-quality web
          applications.
        </p>

        {/* Tech Stack */}
        <div className="text-center mt-2">
          <hr className="my-4 border-gray-500" />
          <div className="flex flex-wrap justify-center gap-4 my-4">
            {techStack.map(tech => {
              const { icon: Icon, color, darkColor } = techStackMap[tech]
              return (
                <div
                  key={tech}
                  className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-sm"
                  style={
                    {
                      ["--text-c"]: color,
                      ["--text-c-dark"]: darkColor ?? color,
                    } as TechIconColors
                  }
                >
                  {Icon && (
                    <Icon
                      className="text-[var(--text-c)] dark:text-[var(--text-c-dark)]"
                      size={20}
                    />
                  )}
                  <span>{tech}</span>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Recent Work */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <ViewAllHeader title="Work Experience" pageUrl="/work" itemCount={work.length} />
        <div className="grid gap-4">
          {work.slice(0, 3).map((job, i) => (
            <WorkItem key={i} {...job} />
          ))}
        </div>
      </motion.div>

      {/* Recent Blog Posts */}
      {blog.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-16 mb-12"
        >
          <ViewAllHeader title="Recent Blog Posts" pageUrl="/blog" itemCount={blog.length} />
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {blog
              .slice()
              .sort((a, b) => getTimeSafe(b.date) - getTimeSafe(a.date))
              .slice(0, 3)
              .map(post => (
                <BlogPost key={post.slug} {...post} />
              ))}
          </div>
        </motion.div>
      )}
    </section>
  )
}
