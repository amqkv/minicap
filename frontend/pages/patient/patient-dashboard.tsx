import Dashboard from "@frontend/components/homepage/dashboard";
import { useSession, getSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async context => {
    return {
        props: {
            session: await getSession(context),
        },
    };
};

export default function PatientDashboard() {
    const { data: session } = useSession();

    // dashboard for hOfficial, iOfficer and admin will come later
    // can add options fields in dashboard-structure
    if (session?.user.Role === USER_ROLES.patient) {
        return <Dashboard data={[]} />;
    } else if (session?.user.Role === USER_ROLES.doctor) {
        return <Dashboard data={[]} />;
    } else if (session?.user.Role === USER_ROLES.hOfficial) {
        return <Dashboard data={[]} />;
    } else if (session?.user.Role === USER_ROLES.iOfficer) {
        return <Dashboard data={[]} />;
    } else if (session?.user.Role === USER_ROLES.admin) {
        return <Dashboard data={[]} />;
    }
    return <p>Access Denied</p>;
}
