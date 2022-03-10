import { pastConditionsProps } from "@frontend/functions/create-status";

export interface requiredDetails {
    Weight: boolean;
    Symptoms: boolean;
    Temperature: boolean;
}

export interface PatientsFormsToFill {
    requiredDetails: requiredDetails;
    pastConditions: pastConditionsProps[];
}