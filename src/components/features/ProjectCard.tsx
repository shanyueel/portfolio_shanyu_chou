"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Project } from "@/data/projects"
import { techStackMap } from "@/lib/constants"
import { TechIconColors } from "@/lib/types"
import Tag from "../ui/Tag"

interface ProjectCardProps extends Project {
  priority?: boolean
}

/**
 * A functional component that renders a project tile with a link, image, and title.
 *
 * @param {Object} props - The prop object for the component, containing slug, title, and image.
 */
export default function ProjectCard({
  slug,
  title,
  image,
  description,
  startDate,
  endDate,
  tag,
  techStack,
  priority = false,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="group flex">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ opacity: { duration: 0.8 } }}
        whileHover={{
          scale: 1.05,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 30,
            duration: 0.4,
          },
        }}
        className="text-dark bg-light border-1 rounded-xl overflow-hidden shadow-md transition-all
                 hover:border-primary hover:shadow-xl dark:bg-dark dark:text-light"
      >
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            priority={priority}
            className="object-cover"
            quality={75}
          />
          <div className="absolute bottom-0 left-0 w-full p-4 z-surface bg-gradient-to-b from-transparent to-dark/80">
            <h3 className="mt-2 text-3xl text-light font-extrabold text-shadow-[2px_2px_0px_rgba(0_0_0_/_0.6)] text-shadow-primary leading-none">
              {title}
            </h3>
          </div>

          <div className="absolute z-surface flex justify-center items-center bg-dark/80 opacity-0 inset-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-lg font-semibold text-white">Explore {title} ➔</span>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs font-semibold text-gray-400">
            {startDate} - {endDate}
          </p>
          <div className="flex flex-wrap gap-1 mt-1">
            {tag.map(tag => (
              <Tag key={tag} className="!bg-light dark:!bg-dark" color="primary" size="sm" outline>
                <span className="font-bold">{tag}</span>
              </Tag>
            ))}
          </div>
          <p className="text-sm mt-1">{description}</p>
          <hr className="w-full my-2 border-gray-200" />
          <div className="flex flex-wrap justify-start gap-1.5">
            {techStack.map(tech => {
              const { icon: Icon, color, darkColor } = techStackMap[tech]

              return (
                <Tag key={tech} color="secondary" size="sm" rounded={false}>
                  <div
                    className="flex items-center gap-1"
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
                        size={14}
                      />
                    )}
                    <span className="font-semibold">{tech}</span>
                  </div>
                </Tag>
              )
            })}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
