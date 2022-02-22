import PatientLists from "@frontend/components/admin/patient/patient-lists";
import { useSession, getSession, GetSessionParams } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";

export async function getServerSideProps(context: GetSessionParams | undefined) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}

const PatientListPage = () => {
    const { data: session } = useSession();

    if (session?.user.Role === USER_ROLES.admin) {
        return <PatientLists sessionId={session.user.AccountId} />;
    }
    return <p id="error-message">Access Denied</p>;
};
export default PatientListPage;
