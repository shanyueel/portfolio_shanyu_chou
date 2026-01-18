import { TechKey } from "@/lib/constants"

enum ProjectTag {
  Personal = "Personal Proj.",
  Commercial = "Commercial Proj.",
  BootStrap = "Bootstrapped Proj.",
}

export interface Project {
  slug: string
  title: string
  image: string
  startDate: string
  endDate: string | "Present"
  tag: ProjectTag[]
  techStack: TechKey[]
  description: string
}

const projects: Project[] = [
  {
    slug: "waca",
    title: "WACA Platform",
    image: "/projects/waca/thumbnail_waca.jpg",
    description:
      "A e-commerce platform that focuses on creating a seamless 'Online-Merge-Offline' retail and reservation experience for all merchants.",
    startDate: "2023-12",
    endDate: "Present",
    tag: [ProjectTag.Commercial],
    techStack: [
      TechKey.Laravel,
      TechKey.Vue,
      TechKey.JavaScript,
      TechKey.JQuery,
      TechKey.TypeScript,
      TechKey.Pinia,
      TechKey.Sass,
      TechKey.TailwindCSS,
      TechKey.Storybook,
    ],
  },
  {
    slug: "wildSync",
    title: "WildSync",
    image: "/projects/wildSync/thumbnail_wildSync.jpg",
    description:
      "An activity platform that connects outdoor enthusiasts, allowing them to plan activities, discover new adventures, and meet people.",
    startDate: "2023-06",
    endDate: "2023-09",
    tag: [ProjectTag.Personal],
    techStack: [
      TechKey.React,
      TechKey.ReactRouter,
      TechKey.Redux,
      TechKey.Firebase,
      TechKey.Sass,
      TechKey.StyledComponents,
    ],
  },
  {
    slug: "alphitter",
    title: "Alphitter",
    image: "/projects/alphitter/thumbnail_alphitter.jpg",
    description:
      "A social media app like Twitter that allows users to post short messages, like interesting content, and follow others.",
    startDate: "2023-04",
    endDate: "2023-05",
    tag: [ProjectTag.BootStrap],
    techStack: [
      TechKey.React,
      TechKey.ReactRouter,
      TechKey.StyledComponents,
      TechKey.Axios,
      TechKey.Postman,
      TechKey.Figma,
    ],
  },
]

export default projects
