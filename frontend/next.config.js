/** @type {import('next').NextConfig} */
//  Can't import from config , put the serverURL as a constant
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serverURL = "http://localhost:3001";
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/api/users/role",
                destination: `${serverURL}/users/role`,
            },
            {
                source: "/api/users/pending",
                destination: `${serverURL}/users/pending`,
            },
            {
                source: "/api/admin/user-role",
                destination: `${serverURL}/admins/update-role`,
            },
            {
                source: "/doctors/get-patients-info/:userId",
                destination: `${serverURL}/doctors/getPatientsInfo/:userId`,
            },
            {
                source: "/doctors/get-patients-name/:userId",
                destination: `${serverURL}/doctors/getPatientsName/:userId`,
            },
            {
                source: "/api/status/review-status",
                destination: `${serverURL}/status/review-status`,
            },
            {
                source: "/api/status/review-status/all",
                destination: `${serverURL}/status/review-status/all`,
            },
            {
                source: "/api/admin/patient-doctor",
                destination: `${serverURL}/admins/patients-doctors`,
            },
            {
                source: "/api/admin/assign-patient-doctor",
                destination: `${serverURL}/admins/assign-patient-doctor`,
            },
            {
                source: "/api/admin/confirm-user-account",
                destination: `${serverURL}/admins/confirm-user-account`,
            },
            {
                source: "/api/admin/reject-user-account",
                destination: `${serverURL}/admins/reject-user-account`,
            },
            {
                source: "/api/patient/get-appointment",
                destination: `${serverURL}/patients/getAppointmentForPatients`,
            }
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
