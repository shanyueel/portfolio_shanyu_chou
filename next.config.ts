import type { NextConfig } from "next"
import type { RuleSetRule } from "webpack"
import createMDX from "@next/mdx"
import remarkGfm from "remark-gfm"
import { RuleSet } from "natural"

// Create MDX configuration
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  webpack: config => {
    const fileLoaderRule = config.module.rules.find((rule: RuleSetRule) =>
      rule.test?.test?.(".svg")
    )
    if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [{ name: "removeViewBox", active: false }],
            },
            titleProp: true,
          },
        },
      ],
    })
    return config
  },
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
