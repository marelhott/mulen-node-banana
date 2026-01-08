import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
    // @ts-ignore
    outputFileTracingExcludes: {
      '*': ['./public/community-workflows/**'],
    },
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
