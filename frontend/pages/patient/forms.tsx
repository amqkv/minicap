import { useSession, getSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import PatientDetailsToProvideForm from "@frontend/components/forms/patient-form-to-fill";
export async function getServerSideProps(context: any) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}

export default function Forms() {
    const { data: session } = useSession();

    if (session?.user.Role === USER_ROLES.patient) {
        return <PatientDetailsToProvideForm />;
    }
    return <p>Access Denied</p>;
}
