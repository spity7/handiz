import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      { source: "/ai-tools", destination: "/ai-prompts", permanent: true },
    ];
  },
};

export default nextConfig;
