import packageJson from "../../package.json"

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
 * Temporary mapping for tech stack icons.
 */
export const techStackMap: Record<string, string> = {
  // programming languages
  Python: "python",
  JavaScript: "js",
  TypeScript: "typescript",

  // frameworks and environments
  React: "react",
  Redux: "redux",
  "React Router": "reactrouter",
  NextJS: "nextjs",
  Vue: "vuejs",
  Pinia: "pinia",
  NodeJS: "nodejs",
  ExpressJS: "expressjs",
  Laravel: "laravel",

  // libraries
  HTML5: "html5",
  CSS3: "css3",
  Sass: "sass",
  TailwindCSS: "tailwindcss",
  JQuery: "jquery",

  // tools
  Git: "git",
  GitHub: "github",
  GitLab: "gitlab",
  Postman: "postman",
  Storybook: "storybook",
  Vercel: "vercel",
  Heroku: "heroku",
  Firebase: "firebase",
  Figma: "figma",

  // others
  "Adobe Photoshop": "ps",
  "Adobe Illustrator": "ai",
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
