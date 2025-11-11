"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import type { IconType } from "react-icons"
import { FaCode, FaPaintBrush, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"
import { HiDownload } from "react-icons/hi"
import { AiFillMessage } from "react-icons/ai"
import { MdShoppingCart } from "react-icons/md"
import { RiLoopRightLine } from "react-icons/ri"
import Lottie from "lottie-react"
import { motion, AnimatePresence } from "framer-motion"
import ViewAllHeader from "@/components/layout/ViewAllHeader"
import ProjectCard from "@/components/features/ProjectCard"
import BlogPost from "@/components/features/BlogPost"
import Button from "@/components/ui/Button"
import Tag from "@/components/ui/Tag"
import { Timeline, TimelineItem } from "@/components/mdx/Timeline"
import Logo from "@/assets/icons/logo.svg"
import scrollDownArrows from "@/assets/animations/scrollDownArrows.json"
import blog from "@/data/blog"
import projects from "@/data/projects"

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
  const BriefIntroRef = useRef<HTMLDivElement>(null)

  const getTimeSafe = (dateStr: string | undefined) => {
    const date = new Date(dateStr ?? "")
    return isNaN(date.getTime()) ? 0 : date.getTime()
  }

  const characteristics: string[] = [
    "design-driven",
    "detail-oriented",
    "collaborative",
    "growth-minded",
    "challenge-seeker",
  ]
  const [charIndex, setCharIndex] = useState(0)

  const facts: Fact[] = [
    { icon: MdShoppingCart, label: "E-commerce" },
    { icon: FaPaintBrush, label: "Design Mindset" },
    { icon: FaCode, label: "CS Fundamentals" },
    { icon: RiLoopRightLine, label: "Agile Development" },
  ]

  const scrollToArea = (TargetRef: React.RefObject<HTMLDivElement>) => {
    TargetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  useEffect(() => {
    const charInterval = setInterval(() => {
      setCharIndex(i => (i + 1) % characteristics.length)
    }, 2500)
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
            <Button
              color="primary"
              className="flex-1 flex items-center gap-1"
              onClick={() => scrollToArea(BriefIntroRef)}
            >
              <AiFillMessage size={16} />
              Who am I ?
            </Button>
            <Link href="#">
              <Button color="secondary" className="flex-1 flex items-center gap-1">
                <HiDownload size={16} />
                Download CV
              </Button>
            </Link>
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
        className="main-container mt-12 scroll-mt-header"
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

      {/* Brief Introduction */}
      <motion.div
        ref={BriefIntroRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="main-container mt-2 text-center scroll-mt-header"
      >
        <h2 className="text-3xl font-extrabold text-primary text-shadow-[2px_2px_0px_rgba(0_0_0_/_0.6)] text-shadow-primary/50 leading-none dark:text-secondary dark:text-shadow-secondary/50">
          A Bit About Me
        </h2>

        <div className="flex flex-col md:flex-row md:items-center md:gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {facts.map((fact, index) => {
                const { icon: Icon, label } = fact

                return (
                  <Tag key={index} color="secondary" className="flex items-center gap-1" outline>
                    <Icon className="text-secondary" size={14} />
                    <span>{label}</span>
                  </Tag>
                )
              })}
            </div>

            <p className="mt-4 px-2 text-left text-dark dark:text-light">
              Hi, I&apos;m Shan-Yu Chou, a Frontend Engineer with 2 years of software experience.
              With a design background, I excel at creating intuitive user experiences using
              Typescript, React, and Vue. I&apos;m also a quick learner adept at writing robust and
              maintainable code to solve complex problems and deliver high-quality applications.
            </p>

            <p className="mt-4 px-2 text-left text-dark dark:text-light">
              Currently seeking new opportunities as a React Front-End Engineer. Open to relocation
              in America, Singapore, Germany, the Netherlands, Czech Republic, and Portugal, as well
              as remote roles.
            </p>
          </div>

          <Timeline className="flex-1 mt-6">
            <TimelineItem
              title="Color, Material, Finishing Designer"
              subtitle="CLEVO Computer co."
              duration="2021-07 - 2022-09"
              location="Taipei, Taiwan"
            />
            <TimelineItem
              title="Web Development Student"
              subtitle="Alpha Camp"
              duration="2022-10 - 2023-04"
              location="Taipei, Taiwan"
            />
            <TimelineItem
              title="Frontend Engineer"
              subtitle="WACA Information Inc."
              duration="2023-12 - Present"
              location="Taipei, Taiwan"
            />
            <TimelineItem
              title="Computer Science Student"
              subtitle="Oregon State University"
              duration="2024-09 - Present"
              location="OR, USA (Remote)"
            />
          </Timeline>
        </div>
        <div className="flex justify-center">
          <Link href="/about">
            <Button className="mt-6">Learn More About Me</Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
