import { useSession, getSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import { requiredDetails, PatientsFormsToFill } from "@frontend/components/forms/types/types";

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
    let statusChartData = [];

    if (session?.user.Role === USER_ROLES.patient) {
        try {

            let response = await Promise.all([
                await fetch(serverURL + "/patients/getRequiredDetails/" + userId),
                await fetch(serverURL + "/status/getAllStatus/" + userId),
                await fetch(serverURL + "/status/getAllStatusChart/" + userId),
            ]);

            let fetchData = await Promise.all([
                response[0].json(),
                response[1].json(),
                response[2].json(),
            ]);

            requiredDetails = getFieldsForPatient(fetchData[0]);
            pastConditions = fetchData[1];
            statusChartData = fetchData[2];

        } catch {}
    }

    return {
        props: {
            session,
            pastConditions,
            requiredDetails,
            statusChartData,
        },
    };
}

export default function PatientSymptomsDaily(props: PatientsFormsToFill) {
    const { data: session } = useSession();

    if (session?.user.Role === USER_ROLES.patient && props.requiredDetails) {
        return <PatientFormToFill {...props} />;
    } else if (session?.user.Role === USER_ROLES.patient) {
        return <p>No forms to fill come back later</p>;
    }
    return <p>Access Denied</p>;
}
