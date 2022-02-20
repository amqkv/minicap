import { useSession, getSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import PatientFormsToFill, {
    requiredDetails,
    PatientsFormsToFill,
} from "@frontend/components/forms/patient-form-to-fill";
import { serverURL } from "@frontend/config/index";
import { pastConditionsInformation } from "@frontend/functions/create-status";

// TODO: fix any
function getFieldsForPatient(requiredDetails: any) {
    let temp: any = {};
    requiredDetails.map((detail: any) => {
        temp = { ...temp, ...detail };
    });
    return temp;
}

export async function getServerSideProps(context: any) {
    let session = await getSession(context);
    let userId = session?.user.AccountId;
    let requiredDetails: requiredDetails | null = null;
    let pastConditions = null;
    if (session?.user.Role === USER_ROLES.patient) {
        try {
            // do not hardcode patientId
            let response: any = await fetch(serverURL + "/patients/getRequiredDetails/" + 3);
            requiredDetails = getFieldsForPatient(await response.json());

            response = await fetch(serverURL + "/status/getAllStatus/" + userId);
            pastConditions = await response.json();
        } catch {}
    }

    return {
        props: {
            session,
            pastConditions,
            requiredDetails,
        },
    };
}

export default function PatientSymptomsDaily(props: PatientsFormsToFill) {
    const { data: session } = useSession();

    if (session?.user.Role === USER_ROLES.patient) {
        return <PatientFormsToFill {...props} />;
    }
    return <p>Access Denied</p>;
}
