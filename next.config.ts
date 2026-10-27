import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.siyanagoldanddiamonds.in",
      },
    ],
  },
};

export default nextConfig;
