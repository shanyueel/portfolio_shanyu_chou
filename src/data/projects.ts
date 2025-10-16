interface Project {
  slug: string
  title: string
  image: string
  description: string
  startDate: string
  endDate: string | "Present"
  techStack: string[]
}

const projects: Project[] = [
  {
    slug: "portfolio",
    title: "Portfolio",
    image: "/projects/pictureA.jpg",
    description: "A personal branding platform designed and engineered to showcase my career and experience for an international recruiters and hiring managers.",
    startDate: "2025-09",
    endDate: "Present",
    techStack: ["Nextjs", "React", "Typescript", "TailwindCSS", "Vercel"],
  },
  {
    slug: "dataWarehouse",
    title: "WACA - Data Warehouse",
    image: "/projects/pictureB.jpg",
    description: "A centralized data warehouse solution for a e-commerce website, enabling efficient data management and analytics.",
    startDate: "2024-11",
    endDate: "2025-05",
    techStack: ["Vue", "TypeScript", "Pinia", "Sass", "Figma", "Storybook"],
  },
  {
    slug: "wildSync",
    title: "WildSync",
    image: "/projects/pictureC.jpg",
    description:
      "A social platform that connects outdoor enthusiasts, allowing them to plan activities, discover new adventures, and meet like-minded people.",
    startDate: "2023-06",
    endDate: "2023-09",
    techStack: ["React", "React Router", "Redux", "Styled Components", "Sass", "Firebase"],
  },
  {
    slug: "alphitter",
    title: "Alphitter",
    image: "/projects/img_alphitter_cover.jpg",
    description: "A social media app that allows users to post short messages and follow others.",
    startDate: "2023-04",
    endDate: "2023-05",
    techStack: ["React", "React Router", "Styled Components", "Axios", "Figma", "Postman"],
  },
]

export default projects
