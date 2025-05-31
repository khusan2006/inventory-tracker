/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ✅ This will allow production builds to complete even if there are type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // ✅ This will allow production builds to complete even if there are ESLint errors
    ignoreDuringBuilds: true,
  }
/* config options here */
};

export default nextConfig; 