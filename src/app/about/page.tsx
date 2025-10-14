import Link from "next/link"
import Image from "next/image"
import { TimelineItem } from "../../components/mdx/Timeline"
import { Timeline } from "../../components/mdx/Timeline"
import { FaDownload, FaShapes, FaUsers, FaSearch } from "react-icons/fa"
import education from "@/data/education"

export default function AboutPage() {
  return (
    <section className="flex flex-col items-center justify-center px-4 max-w-4xl mx-auto text-left">
      <h1 className="text-3xl mb-4 font-extrabold">About me</h1>
      <Link
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center mb-4 gap-2 text-blue-600 hover:underline underline-offset-4"
      >
        <FaDownload /> Download Resume
      </Link>

      {/* Brief Introduction & Image */}
      <div className="flex flex-col items-center gap-4 mb-6 md:flex-row">
        <Image
          src="/img_profile_photo.jpg"
          alt="profile photo"
          className="rounded-lg object-contain select-none"
          width={200}
          height={200}
        />

        <p className="flex text-lg">
          Collaborative and detail-oriented Front-End Engineer with 3+ years of professional
          experience, including 2 years in a dynamic e-commerce team at Wabow Information Inc.
          Leverages a background in Design to build intuitive and engaging user experiences with
          Typescript, Vue, and React. A quick learner adept at writing clean, robust, and
          maintainable code to solve complex problems and deliver high-quality web applications.
        </p>
      </div>

      {/* Philosophy */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3 ">
        <div className="flex flex-col items-center w-full">
          <FaShapes className="fa-regular text-3xl mb-2" />
          <h3 className="text-xl font-bold italic">&quot; Less is more &quot;</h3>
          <p>
            From my design background, I learnt the philosophy to keep products simple to make it
            easy for the user to use it. I think this concept fits the software industry as well,
            since keeping the code easy, clean, and readable helps other to understand and revise
            your features.
          </p>
        </div>
        <div className="flex flex-col items-center w-full">
          <FaUsers className="fa-regular text-3xl mb-2" />
          <h3 className="text-xl font-bold italic">&quot; User-Centric &quot;</h3>
          <p>
            User experience is key to a successful product. Being user-centric means understanding
            the needs of not only end users but also teammates and developers. Considering their
            perspectives reduces conflicts, aligns goals, and makes projects more efficient and
            successful.
          </p>
        </div>
        <div className="flex flex-col items-center w-full">
          <FaSearch className="fa-regular text-3xl mb-2" />
          <h3 className="text-xl font-bold italic">&quot; Curiosity-Driven &quot;</h3>
          <p>
            I’m drawn to the endless challenges and possibilities in software development. Curiosity
            drives growth and innovation, helping me embrace emerging technologies like AI. It
            inspires me to explore new frontiers, adapt to change, and thrive in this ever-evolving
            industry.
          </p>
        </div>
      </div>

      {/* Education */}
      <h2 className="text-2xl mb-2 font-bold">Education</h2>
      <div className="mb-6">
        {education.map((edu, index) => (
          <div key={index} className="mb-2 border-1 rounded-lg p-4 shadow-sm hover:shadow-md">
            <h3 className="text-xl font-semibold">
              {edu.degree} @ {edu.school}
            </h3>
            <h4>
              {edu.duration} | {edu.location}
            </h4>
            <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
            <div className="flex gap-0">
              {edu.skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full mr-2 mt-1"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Personal Journey */}
      <h2 className="text-2xl mb-4 font-bold">Personal Journey</h2>
      <Timeline>
        <TimelineItem
          title="Gap year - Military service and Career exploration"
          duration="2020"
          location="Taipei, Taiwan"
        ></TimelineItem>

        <TimelineItem
          title="Color, Material, Finishing design for laptop company"
          duration="2021 - 2022"
          location="Taipei, Taiwan"
        ></TimelineItem>

        <TimelineItem
          title="Changing careers from design to programming"
          duration="2023"
          location="Taipei, Taiwan"
        ></TimelineItem>

        <TimelineItem
          title="E-commerce front-end development"
          duration="2024 - 2025"
          location="Taipei, Taiwan"
        ></TimelineItem>
      </Timeline>
    </section>
  )
}
