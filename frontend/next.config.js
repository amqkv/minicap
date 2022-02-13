/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/api/users/role",
                destination: "http://localhost:3001/users/role",
            },
            {
                source: "/api/admin/user-role",
                destination: `http://localhost:3001/admins/update-role`,
            },
        ];
    },
};

module.exports = nextConfig;
