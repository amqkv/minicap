/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/users/role',
        destination: 'http://localhost:3001/users/role',
      },
      {
        source: "/api/users/pending",
        destination: "http://localhost:3001/users/pending",
      },
      {
        source: '/api/admin/user-role',
        destination: `http://localhost:3001/admins/update-role`,
      },
      {
        source: '/api/admin/confirm-user-account',
        destination: `http://localhost:3001/admins/confirm-user-account`,
      },
    ];
  },
};

module.exports = nextConfig;
