import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    unoptimized: true,
  },

  async redirects() {
    const lmsUrl =
      process.env.NEXT_PUBLIC_LMS_URL || "https://learn.handiz.org";

    return [
      { source: "/ai-tools", destination: "/ai-prompts", permanent: true },
      {
        source: "/my-courses",
        destination: `${lmsUrl}/my-courses`,
        permanent: false,
      },
      {
        source: "/my-courses/:path*",
        destination: `${lmsUrl}/my-courses/:path*`,
        permanent: false,
      },
      {
        source: "/courses/:slug/learn/:lessonSlug",
        destination: `${lmsUrl}/courses/:slug/learn/:lessonSlug`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
