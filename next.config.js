/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    API_URI: process.env.API_URI,
  },
};

module.exports = nextConfig;
