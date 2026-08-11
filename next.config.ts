import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/cifra",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;