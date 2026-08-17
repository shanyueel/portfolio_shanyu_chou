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
  // Keep the Node-only ONNX backend out of any client bundle. transformers.js
  // ships both a native Node backend and a WASM one; the browser needs only
  // WASM, but without this the bundler follows onnxruntime-node's native
  // bindings and the build fails.
  serverExternalPackages: ["@huggingface/transformers", "onnxruntime-node"],
  // Configure Turbopack to correctly parse SVGs as React components using @svgr/webpack
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "onnxruntime-node": false,
      sharp: false,
    }
    return config
  },
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
