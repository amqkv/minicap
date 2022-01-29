/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/users/role',
        destination: 'http://localhost:3001/users/role',
      },
    ];
  },
};

module.exports = nextConfig;
