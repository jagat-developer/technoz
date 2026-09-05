import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const appDir = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dmboo1nu1/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "auto-brite.ca",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  skipTrailingSlashRedirect: true,
  turbopack: {
    root: appDir,
  },
  async redirects() {
    return [
      {
        source: "/check",
        destination: "/servicing-pricing",
        permanent: true,
      },
      {
        source: "/check/",
        destination: "/servicing-pricing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
