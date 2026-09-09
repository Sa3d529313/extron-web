import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/extron-web",
  allowedDevOrigins: ["172.20.10.8"],
};

export default nextConfig;
