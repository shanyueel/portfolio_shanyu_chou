import packageJson from "../../package.json"
import type { IconType } from "react-icons"
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
} from "react-icons/si"
import { GiPineapple } from "react-icons/gi"

/**
 * Array of navigation items for the website (i.e. paths/pages to navigate to).
 */
export const navItems = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
]

/**
 * Mapping for tech stack icons from strings to react-icons components.
 */
export const techStackMap: Record<string, IconType> = {
  // programming languages
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,

  // frameworks and environments
  React: SiReact,
  Redux: SiRedux,
  "React Router": SiReactrouter,
  NextJS: SiNextdotjs,
  Vue: SiVuedotjs,
  Pinia: GiPineapple,
  NodeJS: SiNodedotjs,
  ExpressJS: SiExpress,
  Laravel: SiLaravel,

  // libraries
  HTML5: SiHtml5,
  CSS3: SiCss3,
  Sass: SiSass,
  TailwindCSS: SiTailwindcss,
  JQuery: SiJquery,

  // tools
  Git: SiGit,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  Postman: SiPostman,
  Storybook: SiStorybook,
  Vercel: SiVercel,
  Heroku: SiHeroku,
  Firebase: SiFirebase,
  Figma: SiFigma,

  // others
  "Adobe Photoshop": SiAdobephotoshop,
  "Adobe Illustrator": SiAdobeillustrator,
}

export const roleAbbreviationMap: Record<string, string> = {
  PO: "Product Owner",
  "UI/UX": "UI/UX Designer",
  FE: "Frontend Engineer",
  BE: "Backend Engineer",
}

/**
 * Version of the application from package.json.
 */
export const appVersion = packageJson.version