import type { NextConfig } from "next"
import createMDX from "@next/mdx"

// Create MDX configuration
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    // @ts-expect-error: Next.js 15 requires plugins to be serializable, so we pass string instead of function
    remarkPlugins: [["remark-gfm"]],
    rehypePlugins: [],
  },
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Configure Turbopack to correctly parse SVGs as React components using @svgr/webpack
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
