/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: true,
  },
  webpack: (config) => {
    // Required for some client components
    config.resolve.extensionAlias = {
      '.js': ['.tsx', '.ts', '.jsx', '.js'],
    };
    return config;
  },
};

// Export ESM instead of CommonJS (Fix Vercel warning)
export default nextConfig;
