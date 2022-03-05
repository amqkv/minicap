import { serverURL } from "@frontend/config/index";

export interface StatusParameters {
    temperature: number;
    weight: number;
    symptoms: string;
    isReviewed: boolean;
    statusTime: string;
    accountId: number | undefined;
}

export interface pastConditionsProps{
    StatusId?: number;
    Temperature: number;
    StatusTime: string;
    IsReviewed?: boolean;
    UserId?: number;
    Weight: number;
    Symptoms: string;
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



// export async function pastConditionsInformation(userId: number | undefined) {
//     return userId && await fetch(serverURL + "/getAllStatus/" + userId, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//     });
// }

