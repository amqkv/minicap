import { useSession, getSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import { requiredDetails,  PatientsFormsToFill} from "@frontend/components/forms/types/types";

import PatientFormToFill from "@frontend/components/forms/patient-form-to-fill";
import { serverURL } from "@frontend/config/index";
import { NextPageContext } from "next";

function getFieldsForPatient(requiredDetails: requiredDetails[]) {
    let temp: any = {};
    requiredDetails.map((detail: any) => {
        temp = { ...temp, ...detail };
    });
    return temp;
}

export async function getServerSideProps(context: NextPageContext) {
    let session = await getSession(context);
    let userId = session?.user.AccountId;
    let requiredDetails: requiredDetails | null = null;
    let pastConditions = [];
    if (session?.user.Role === USER_ROLES.patient) {
        try {
            let response: any = await fetch(serverURL + "/patients/getRequiredDetails/" + userId);
            console.log(response);
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

    if (session?.user.Role === USER_ROLES.patient && props.requiredDetails) {
        return <PatientFormToFill {...props} />;
    } else if (session?.user.Role === USER_ROLES.patient){
        return <p>No forms to fill come back later</p>
    }
    return <p>Access Denied</p>;
}
