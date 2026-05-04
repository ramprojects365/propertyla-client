import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "159.223.92.101",
    //     port: "3008",
    //     pathname: "/uploads/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "*.digitaloceanspaces.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "propertiesla.nyc3.digitaloceanspaces.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "*.nyc3.digitaloceanspaces.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "*.blr1.digitaloceanspaces.com",
    //   },
    // ],
    domains: [
    "propertyla-upload-bucket-2026.s3.ap-southeast-2.amazonaws.com",
    "propertyla-server-production.up.railway.app",
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
