import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true";
const basePath = isGhPages ? "/Jeevocation" : "";
const assetPrefix = isGhPages ? "/Jeevocation/" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix,
  images: { unoptimized: true },
};

export default nextConfig;
