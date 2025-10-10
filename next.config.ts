import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence Turbopack root warning by explicitly setting root
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
