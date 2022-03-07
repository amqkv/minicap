import { serverURL } from "@frontend/config/index";

export default async function changeCovidStatus(covidChange: boolean, id: string | undefined) {
    return await fetch(serverURL + "/health-official/updatePatientStatus", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            covidChange,
            id,
        }),
    });
}
