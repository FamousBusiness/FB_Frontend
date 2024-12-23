/** @type {import('next').NextConfig} */
module.exports = {

  typescript: {
    // Will use the specified TypeScript version to check your code.
    ignoreBuildErrors: true,
  },
  // reactStrictMode: true,
  // swcMinify: true,
  // experimental: {
  //   appDir: true
  // }
  env: {
    SERVER_API_SECRET: process.env.SERVER_API_SECRET,
  },
  images: {
    domains: ['https://api.famousbusiness.in','https://mdwebzotica.famousbusiness.in','https://images.unsplash.com', 'http://127.0.0.1:8000'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mdwebzotica.famousbusiness.in',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'api.famousbusiness.in',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        // pathname: '/account123/**',
      },
    ],
  },
};
