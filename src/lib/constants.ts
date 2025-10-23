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

/* Mapping for tech stack icons and colors */
interface TechStackIcon {
  icon: IconType
  color: ColorHex
  darkColor?: ColorHex
}

export const techStackMap: Record<string, TechStackIcon> = {
  // programming languages
  Python: { icon: SiPython, color: "#3776AB" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#007ACC" },

  // frameworks and environments
  React: { icon: SiReact, color: "#61DAFB" },
  Redux: { icon: SiRedux, color: "#764ABC" },
  "React Router": { icon: SiReactrouter, color: "#CA4245" },
  NextJS: { icon: SiNextdotjs, color: "#000000", darkColor: "#FFFFFF" },
  Vue: { icon: SiVuedotjs, color: "#4FC08D" },
  Pinia: { icon: GiPineapple, color: "#FFE46A" },
  NodeJS: { icon: SiNodedotjs, color: "#8CC84B" },
  ExpressJS: { icon: SiExpress, color: "#000000", darkColor: "#FFFFFF" },
  Laravel: { icon: SiLaravel, color: "#FF2D20" },

  // libraries
  HTML5: { icon: SiHtml5, color: "#E34F26" },
  CSS3: { icon: SiCss3, color: "#1572B6" },
  Sass: { icon: SiSass, color: "#CC6699" },
  TailwindCSS: { icon: SiTailwindcss, color: "#38B2AC" },
  "Styled Components": { icon: FaCode, color: "#333333", darkColor: "#FFFFFF" },
  JQuery: { icon: SiJquery, color: "#0769AD" },

  // tools
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "#181717", darkColor: "#FFFFFF" },
  GitLab: { icon: SiGitlab, color: "#FCA121" },
  Postman: { icon: SiPostman, color: "#FF6C37" },
  Storybook: { icon: SiStorybook, color: "#FF4785" },
  Vercel: { icon: SiVercel, color: "#000000", darkColor: "#FFFFFF" },
  Heroku: { icon: SiHeroku, color: "#430098" },
  Firebase: { icon: SiFirebase, color: "#FFCA28" },
  Figma: { icon: SiFigma, color: "#F24E1E" },
  Axios: { icon: SiAxios, color: "#5A29E4" },

  // others
  "Adobe Photoshop": { icon: SiAdobephotoshop, color: "#31A8FF" },
  "Adobe Illustrator": { icon: SiAdobeillustrator, color: "#FF9A00" },
  Keyshot: { icon: IoIosAperture, color: "#189AFA" },
  PowerPoint: { icon: PiMicrosoftPowerpointLogoFill, color: "#D24726" },
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
