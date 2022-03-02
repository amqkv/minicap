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
                source: "/api/users/pending",
                destination: "http://localhost:3001/users/pending",
            },
            {
                source: "/api/admin/user-role",
                destination: `http://localhost:3001/admins/update-role`,
            },
            {
                source: "/api/status/review-status",
                destination: `http://localhost:3001/status/review-status`,
            },
            {
                source: "/api/admin/patient-doctor",
                destination: `http://localhost:3001/admins/patients-doctors`,
            },
            {
                source: "/api/admin/assign-patient-doctor",
                destination: `http://localhost:3001/admins/assign-patient-doctor`,
            },
            {
                source: "/api/admin/confirm-user-account",
                destination: `http://localhost:3001/admins/confirm-user-account`,
            },
        ];
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};

module.exports = nextConfig;
