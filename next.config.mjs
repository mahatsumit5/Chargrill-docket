/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://res.cloudinary.com/**")],
  },
  eslint: {
    dirs: ["lib"],
  },
  experimental: {},
};

export default nextConfig;
