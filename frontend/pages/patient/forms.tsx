import { useSession, getSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import PatientDetailsToProvideForm, { requiredDetails } from "@frontend/components/forms/patient-form-to-fill";
import { serverURL } from "@frontend/config/index";

// rename
function getCheckedBoxes(requiredDetails: any) {
    let temp: any = {}
    requiredDetails.map((detail: any) => {
        temp = { ...temp, ...detail }
    })
    return temp
}

export async function getServerSideProps(context: any) {
    let session = await getSession(context)
    let patientId = session?.user.AccountId

    let requiredDetails: requiredDetails | null = null
    if (session?.user.Role === USER_ROLES.patient) {
        try {
            const response: any = await fetch(serverURL + "/patients/getRequiredDetails/" + (11));
            requiredDetails = getCheckedBoxes(await response.json())

        } catch { }
    }

    return {
        props: {
            session,
            requiredDetails
        },
    };
}


export default function Forms({ requiredDetails }: { requiredDetails: requiredDetails }) {
    const { data: session } = useSession();

    if (session?.user.Role === USER_ROLES.patient && requiredDetails) {
        return <PatientDetailsToProvideForm requiredDetails={requiredDetails} />;
    }
    return <p>Access Denied</p>;
}
