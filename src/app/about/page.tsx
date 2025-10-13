import { TimelineItem } from "../../components/mdx/Timeline"
import { Timeline } from "../../components/mdx/Timeline"

export default function AboutPage() {
  return (
    <section className="flex flex-col items-center justify-center px-4 max-w-4xl mx-auto text-left">
      <h1 className="text-3xl mb-4 font-extrabold">About me</h1>

      {/* Brief Introduction & Image */}

      {/* Philosophy & Interests */}
      <h2 className="text-2xl mb-2 font-bold">Philosophy & Interests</h2>
      <div className="mb-4"></div>

      {/* Education */}
      <h2 className="text-2xl mb-2 font-bold">Education</h2>
      <div className="mb-4"></div>

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
