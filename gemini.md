# Welcome to the Gemini CLI!

## Natural Language Commands

- **"how to bmad"**: Ask this to display the "## Prompt Guide" guide at any time.

## Prompt Guide

This file is your guide to using the integrated BMAD (Better Maker-Agent Development) methodology for this project.

You can interact with specialized AI agents (e.g., `@pm`, `@dev`, `@qa`) and execute predefined, end-to-end workflows to build and enhance this application.

- **To use an agent**: Type `@<agent_name>` followed by your request (e.g., `gemini: @pm create a user story for a login page`).
- **To run a workflow**: Type `gemini: bmad-method <workflow_name>` (e.g., `gemini: bmad-method greenfield-fullstack`).

Refer to the tables below for a full list of available agents, commands, and workflows.

***

## Project Introduction

This is a modern personal portfolio website built with Next.js, React, and TypeScript. The project uses Next.js's App Router architecture and is styled with Tailwind CSS. Content, such as blog posts, is managed via MDX.

- **Key Technologies**: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, MDX
- **Core Features**:
    - Project Showcase
    - Work Experience
    - Blog
    - About Me

## File Structure

- **/src**: Contains all core source code.
    - **/src/app**: The Next.js App Router. Contains all pages (`page.tsx`), routes, layouts (`layout.tsx`), and global styles (`globals.css`).
        - **/src/app/projects**: The portfolio page.
        - **/src/app/work**: The work experience page.
    - **/src/components**: Reusable React components, such as the Header, Footer, ProjectTile, etc.
    - **/src/data**: The project's data sources, including data for projects, work experience, and blog posts.
    - **/src/lib**: Shared utility functions, constants, and TypeScript type definitions.

- **/public**: Contains all static assets.
    - **/public/icons**: Favicons.
    - **/public/projects**: Image assets for portfolio projects.

- **/.bmad-core**: Contains the core configuration for the BMAD (Better Maker-Agent Development) methodology.
    - **/agents**: Defines the different AI agent roles, such as developer (`dev.md`), project manager (`pm.md`), etc.
    - **/tasks**: Defines specific tasks that the agents can perform.
    - **/workflows**: Defines workflows that combine multiple agents and tasks.
    - `user-guide.md`: The detailed user guide for the BMAD methodology.

- **Root Config Files**:
    - `next.config.ts`: Main Next.js configuration file.
    - `postcss.config.mjs` & `tailwind.config.mjs`: Tailwind CSS configuration.
    - `tsconfig.json`: TypeScript configuration.
    - `package.json`: Project dependencies and scripts.

## BMAD Agent Usage Guide

The BMAD methodology provides a suite of AI agents that simulate an agile team. You can invoke them using the `@` symbol to perform specific tasks.

### Main Agents

| Agent | Invocation | Responsibilities |
| :--- | :--- | :--- |
| Project Manager| `@pm` | Creates Product Requirement Documents (PRDs) and User Stories. |
| Architect | `@architect` | Designs the system architecture based on requirements. |
| Developer | `@dev` | Implements features and writes tests based on user stories and architecture. |
| Test Architect | `@qa` | Conducts code reviews, risk assessments, designs test strategies, and manages quality gates. |
| Product Owner | `@po` | Validates user stories and ensures the output meets requirements. |
| Scrum Master | `@sm` | Plans the next user story for development. |
| BMad-Master | `@bmad-master` | A general-purpose manager that can perform all tasks except writing code. |

### Test Architect (`@qa`) Special Commands

The `@qa` agent provides a powerful set of commands to ensure software quality:

| Command | When to Use | Purpose |
| :--- | :--- | :--- |
| `*risk` | Before development (After story draft) | Assesses the potential risks of a user story. |
| `*design` | Before development (After risk assessment) | Creates a test strategy based on risks and requirements. |
| `*trace` | During development (Mid-implementation) | Tracks the coverage of requirements and test cases. |
| `*nfr` | During development (While building) | Validates non-functional requirements (e.g., performance, security). |
| `*review` | After development (Review-ready) | Performs a full code review and quality assessment, producing a quality gate report. |
| `*gate` | After review (After fixing issues) | Updates the status of the quality gate (PASS/FAIL/CONCERNS). |

**Usage Examples:**
- `gemini: @pm create a user story for the "user login" feature`
- `gemini: @dev implement the login form based on the latest user story`
- `gemini: @qa *risk {story}`

### Available BMAD Workflows

You can use the following predefined workflows via the `bmad-method` command. These workflows are designed to guide you through the full development lifecycle, from concept to implementation.

| Workflow | Type | Description |
| :--- | :--- | :--- |
| `greenfield-fullstack` | Greenfield | For building **new full-stack applications** from concept to development. Supports comprehensive planning for complex projects and rapid prototyping for simple ones. |
| `greenfield-ui` | Greenfield | For building **new frontend applications** from concept to development. Supports comprehensive planning for complex UIs and rapid prototyping for simple interfaces. |
| `greenfield-service` | Greenfield | For building **new backend services** from concept to development. Supports comprehensive planning for complex services and rapid prototyping for simple APIs. |
| `brownfield-fullstack` | Brownfield | For enhancing **existing full-stack applications** with new features, modernization, or significant changes. This workflow handles existing system analysis and safe integration. |
| `brownfield-ui` | Brownfield | For enhancing **existing frontend applications** with new features, modernization, or design improvements. This workflow handles existing UI analysis and safe integration. |
| `brownfield-service` | Brownfield | For enhancing **existing backend services and APIs** with new features, modernization, or performance improvements. This workflow handles existing system analysis and safe integration. |

***