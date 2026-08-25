import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const nextConfig: NextConfig = isGitHubPages
  ? {output:'export',basePath:'/Indiangods',assetPrefix:'/Indiangods',trailingSlash:true,images:{unoptimized:true}}
  : {};

export default nextConfig;
