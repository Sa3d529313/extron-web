import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/extron-web",
  allowedDevOrigins: ["172.20.10.8", "10.131.188.222"],
};

export default nextConfig;
