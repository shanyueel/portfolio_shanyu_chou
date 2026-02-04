import Link from "next/link"
import type { IconType } from "react-icons"
import { FaCode, FaPaintBrush } from "react-icons/fa"
import { MdShoppingCart } from "react-icons/md"
import { RiLoopRightLine } from "react-icons/ri"
import Button from "@/components/ui/Button"
import Tag from "@/components/ui/Tag"
import Timeline from "@/components/ui/Timeline"
import TimelineItem from "@/components/ui/TimelineItem"
import { FadeInUpOnScroll } from "@/components/animations"

interface Fact {
  icon: IconType
  label: string
}

/**
 * About Me 區塊 - 伺服器端元件
 * 所有內容都是靜態的，不需要客戶端互動
 */
export default function AboutSection() {
  const facts: Fact[] = [
    { icon: MdShoppingCart, label: "E-commerce" },
    { icon: FaPaintBrush, label: "Design Mindset" },
    { icon: FaCode, label: "CS Fundamentals" },
    { icon: RiLoopRightLine, label: "Agile Development" },
  ]

  return (
    <FadeInUpOnScroll className="main-content mt-2 text-center scroll-mt-header">
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
    </FadeInUpOnScroll>
  )
}
