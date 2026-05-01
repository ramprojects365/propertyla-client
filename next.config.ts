import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "159.223.92.101",
        port: "3008",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "propertiesla.nyc3.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "*.nyc3.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "*.blr1.digitaloceanspaces.com",
      },
    ],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
