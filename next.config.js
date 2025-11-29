/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [], // ← 必须是 array，不能是 true/false
  },
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com"],
  },
  reactStrictMode: false,
};

export default nextConfig;
