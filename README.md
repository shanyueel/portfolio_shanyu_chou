# Shan-Yu Chou — Frontend Engineer Portfolio

A personal portfolio website for **Shan-Yu Chou**, a Frontend Engineer with 2 years of experience specializing in **TypeScript**, **React**, and **Vue**. Built with [Next.js](https://nextjs.org) and designed to showcase work experience, projects, and blog writing through an interactive, AI-inspired conversational interface.

> **Note:** This project is forked from a [Next.js personal website theme](https://github.com/Cameron-Burkholder/nextjs-portofolio-website) and has been heavily customized — including an AI chatbot-style hero section, MDX-powered content, and a fully personalized design — to serve as Shan-Yu's professional portfolio.

---

## ✨ Highlights

- 🤖 **AI Chatbot Hero** — An interactive conversational UI on the homepage that lets visitors ask questions and explore Shan-Yu's background, skills, and experience through a chat-like interface.
- 📝 **MDX-Powered Content** — Work experience, project showcases, and blog posts are all written in MDX, combining the expressiveness of Markdown with the power of React components.
- 🌙 **Light / Dark Mode** — Full theme support with automatic system preference detection via `next-themes`.
- 🎞️ **Smooth Animations** — Framer Motion and Lottie animations throughout for a polished, modern feel.
- 🔍 **SEO Optimized** — Metadata, Open Graph tags, sitemap, and robots.txt configured for search engine visibility.

---

## 🧱 Project Structure

The site is organized around the following main routes/pages:

- 🏠 **Home** – `/` — AI chatbot hero, featured projects, recent blog posts, and an about summary.
- 💼 **Work** – `/work` — Professional experience with detailed MDX write-ups.
- 🛠️ **Projects** – `/projects` — Personal and collaborative project showcases.
- ✍️ **Blog** – `/blog` — Technical articles and learning notes.
- 👤 **About** – `/about` — Detailed about page.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18+)
- npm / yarn / pnpm / bun

### Installation

```bash
# Clone the repository
git clone https://github.com/shanyueel/portfolio_shanyu_chou.git
cd portfolio_shanyu_chou

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 🛠 Tech Stack

| Category   | Technology                                                            |
| ---------- | --------------------------------------------------------------------- |
| Framework  | [Next.js](https://nextjs.org) (App Router)                            |
| Language   | [TypeScript](https://www.typescriptlang.org)                          |
| Styling    | [Tailwind CSS](https://tailwindcss.com)                               |
| Content    | [MDX](https://mdxjs.com) via `next-mdx-remote`                        |
| Animations | [Framer Motion](https://www.framer.com/motion/) / Lottie              |
| Theme      | [next-themes](https://github.com/pacocoursey/next-themes)             |
| Search     | [Fuse.js](https://www.fusejs.io) (fuzzy matching for chatbot queries) |
| Font       | [Gabarito](https://fonts.google.com/specimen/Gabarito) (Google Fonts) |

---

## 📄 Content Management

All content lives under `src/data/` and is authored in **MDX**:

```
src/data/
├── blog/              # Blog posts (post1.mdx – post15.mdx)
├── heroResponses/     # AI chatbot response content
├── projects/          # Project showcases (alphitter, waca, wildSync)
├── work/              # Work experience write-ups
└── about/             # About page content
```

To add new content, simply create a new `.mdx` file in the appropriate directory and follow the existing frontmatter conventions.

---

## ▲ Deployment

This app can be deployed on any platform that supports Node.js. Recommended options:

- [Vercel](https://vercel.com) — Zero-config deployment for Next.js
- [Netlify](https://www.netlify.com)
- [Render](https://render.com)
- [AWS Amplify](https://aws.amazon.com/amplify/)

For detailed instructions, see the [Next.js deployment guide](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
