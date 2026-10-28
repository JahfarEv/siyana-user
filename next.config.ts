import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 86400,
    qualities: [60, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.siyanagoldanddiamonds.in",
      },
    ],
  },
};

export default nextConfig;
