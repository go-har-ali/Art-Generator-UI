import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "eval.funsol.cloud",
      },
      {
        protocol: "http",
        hostname: "cognise.art",
      },
    ],
  },
};

export default nextConfig;
