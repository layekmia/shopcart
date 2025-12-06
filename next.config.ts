import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "", // optional, leave empty
        pathname: "/images/**", // allow all paths under /images
      },
    ],
  },
};

export default nextConfig;
