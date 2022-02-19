import { Status } from "@chakra-ui/react";
import { serverURL } from "@frontend/config/index";

export interface StatusParameters {
    temperature: number;
    weight: number;
    symptoms: string;
    isReviewed: boolean;
    statusTime: string;
    accountId: number | undefined;
}

export async function statusFilled({ temperature, weight, symptoms, isReviewed, statusTime, accountId}: StatusParameters) {
    return accountId && await fetch(serverURL + "/status/addStatus", {
        method: "POST",
        body: JSON.stringify({
            temperature,
            weight,
            symptoms,
            isReviewed,
            statusTime,
            accountId,
        }),
        headers: { "Content-Type": "application/json" },
    });
}


// export async function getPatientId( patientId : number | undefined) {
//     return await fetch(serverURL + "/patients/getPatient/" + (51), {
//         method: "GET",
//         body: JSON.stringify({
//             patientId,
//         }),
//         headers: { "Content-Type": "application/json" },
//     });
// }
