/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  reactStrictMode: true,
  ...(isGithubPages
    ? {
        output: "export",
        basePath: "/ai-invest-research-workspace",
        assetPrefix: "/ai-invest-research-workspace/",
        images: {
          unoptimized: true
        }
      }
    : {})
};

export default nextConfig;
