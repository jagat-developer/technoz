import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const appDir = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
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
