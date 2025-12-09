import packageJson from "../../package.json"
import type { IconType } from "react-icons"
import type { ColorHex } from "./types"
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiRedux,
  SiReactrouter,
  SiNextdotjs,
  SiVuedotjs,
  SiNodedotjs,
  SiExpress,
  SiLaravel,
  SiHtml5,
  SiCss3,
  SiSass,
  SiTailwindcss,
  SiJquery,
  SiGit,
  SiGithub,
  SiGitlab,
  SiPostman,
  SiStorybook,
  SiVercel,
  SiHeroku,
  SiFirebase,
  SiFigma,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAxios,
} from "react-icons/si"
import { GiPineapple } from "react-icons/gi"
import { IoIosAperture } from "react-icons/io"
import { PiMicrosoftPowerpointLogoFill } from "react-icons/pi"
import { FaCode } from "react-icons/fa"

/* Array of navigation items for the website. */
interface NavItem {
  name: string
  path: string
}

export const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
  { name: "Projects", path: "/projects" },
  // { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
]

export enum TechKey {
  // programming languages
  Python = "Python",
  JavaScript = "JavaScript",
  TypeScript = "TypeScript",
  HTML5 = "HTML5",
  CSS3 = "CSS3",

  // frameworks and environments
  React = "React",
  Redux = "Redux",
  ReactRouter = "React Router",
  NextJS = "NextJS",
  Vue = "Vue",
  Pinia = "Pinia",
  NodeJS = "NodeJS",
  ExpressJS = "ExpressJS",
  Laravel = "Laravel",

  // libraries
  Sass = "Sass",
  TailwindCSS = "TailwindCSS",
  StyledComponents = "Styled Components",
  JQuery = "JQuery",

  // tools
  Git = "Git",
  GitHub = "GitHub",
  GitLab = "GitLab",
  Postman = "Postman",
  Storybook = "Storybook",
  Vercel = "Vercel",
  Heroku = "Heroku",
  Firebase = "Firebase",
  Figma = "Figma",
  Axios = "Axios",

  // others
  AdobePhotoshop = "Adobe Photoshop",
  AdobeIllustrator = "Adobe Illustrator",
  Keyshot = "Keyshot",
  PowerPoint = "PowerPoint",
}

export type TechKeyType = `${TechKey}`

/* Mapping for tech stack icons and colors */
interface TechStackIcon {
  icon: IconType
  color: ColorHex
  darkColor?: ColorHex
}

export const techStackMap: Record<TechKeyType, TechStackIcon> = {
  // programming languages
  [TechKey.Python]: { icon: SiPython, color: "#3776AB" },
  [TechKey.JavaScript]: { icon: SiJavascript, color: "#F7DF1E" },
  [TechKey.TypeScript]: { icon: SiTypescript, color: "#007ACC" },

  // frameworks and environments
  [TechKey.React]: { icon: SiReact, color: "#61DAFB" },
  [TechKey.Redux]: { icon: SiRedux, color: "#764ABC" },
  [TechKey.ReactRouter]: { icon: SiReactrouter, color: "#CA4245" },
  [TechKey.NextJS]: { icon: SiNextdotjs, color: "#000000", darkColor: "#FFFFFF" },
  [TechKey.Vue]: { icon: SiVuedotjs, color: "#4FC08D" },
  [TechKey.Pinia]: { icon: GiPineapple, color: "#FFE46A" },
  [TechKey.NodeJS]: { icon: SiNodedotjs, color: "#8CC84B" },
  [TechKey.ExpressJS]: { icon: SiExpress, color: "#000000", darkColor: "#FFFFFF" },
  [TechKey.Laravel]: { icon: SiLaravel, color: "#FF2D20" },

  // libraries
  [TechKey.HTML5]: { icon: SiHtml5, color: "#E34F26" },
  [TechKey.CSS3]: { icon: SiCss3, color: "#1572B6" },
  [TechKey.Sass]: { icon: SiSass, color: "#CC6699" },
  [TechKey.TailwindCSS]: { icon: SiTailwindcss, color: "#38B2AC" },
  [TechKey.StyledComponents]: { icon: FaCode, color: "#333333", darkColor: "#FFFFFF" },
  [TechKey.JQuery]: { icon: SiJquery, color: "#0769AD" },

  // tools
  [TechKey.Git]: { icon: SiGit, color: "#F05032" },
  [TechKey.GitHub]: { icon: SiGithub, color: "#181717", darkColor: "#FFFFFF" },
  [TechKey.GitLab]: { icon: SiGitlab, color: "#FCA121" },
  [TechKey.Postman]: { icon: SiPostman, color: "#FF6C37" },
  [TechKey.Storybook]: { icon: SiStorybook, color: "#FF4785" },
  [TechKey.Vercel]: { icon: SiVercel, color: "#000000", darkColor: "#FFFFFF" },
  [TechKey.Heroku]: { icon: SiHeroku, color: "#430098" },
  [TechKey.Firebase]: { icon: SiFirebase, color: "#FFCA28" },
  [TechKey.Figma]: { icon: SiFigma, color: "#F24E1E" },
  [TechKey.Axios]: { icon: SiAxios, color: "#5A29E4" },

  // others
  [TechKey.AdobePhotoshop]: { icon: SiAdobephotoshop, color: "#31A8FF" },
  [TechKey.AdobeIllustrator]: { icon: SiAdobeillustrator, color: "#FF9A00" },
  [TechKey.Keyshot]: { icon: IoIosAperture, color: "#189AFA" },
  [TechKey.PowerPoint]: { icon: PiMicrosoftPowerpointLogoFill, color: "#D24726" },
}

/* Roles Abbreviation and full name */
export const roleAbbreviationMap: Record<string, string> = {
  PO: "Product Owner",
  "UI/UX": "UI/UX Designer",
  FE: "Frontend Engineer",
  BE: "Backend Engineer",
}

/* Version of the application from package.json */
export const appVersion = packageJson.version
