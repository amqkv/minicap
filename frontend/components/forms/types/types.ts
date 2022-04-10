import { pastConditionsProps } from "@frontend/functions/create-status";

export interface requiredDetails {
    Weight: boolean;
    Symptoms: boolean;
    Temperature: boolean;
}

export interface doctorInfo {
    Doctor_AccountId: number;
    FirstName: string;
    LastName: string;
}

export interface PatientsFormsToFill {
    requiredDetails: requiredDetails;
    pastConditions: pastConditionsProps[];
    statusChartData: pastConditionsProps[];
    assignedDoctor: doctorInfo;
}
