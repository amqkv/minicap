export interface Patient {
    patientId: number;
    doctorId: number;
    basicInformation: PatientBasicInformation;
    requiredDetails: RequiredDetails;
    status: PatientStatus[];
    isPrioritized: boolean;
    isAllReviewed: boolean;
}

export interface Patient_HealthOfficial extends PatientBasicInformation {
    status: PatientStatus[];
    isPrioritized: boolean;
    patientId: number;
}

export interface RequiredDetails {
    weight: boolean;
    temperature: boolean;
    symptoms: boolean;
}

export interface PatientBasicInformation {
    patientId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    phoneNumber?: string;
    postalCode?: string;
    city?: string;
    hasCovid?: boolean;
    id?: string;
    gender?: string;
    dob?: string;
    age?: number;
    height?: number;
    number?: number;
    date?: Date;
}

export interface PatientStatus {
    statusId: number;
    weight: { value: number; unit: string };
    temperature: { value: number; unit: string };
    symptoms: { value: string; unit: string };
    lastUpdated: number;
    isReviewed: boolean;
    statusTime: string;
}

export interface StatusDataProps {
    StatusId?: number;
    Temperature: number;
    StatusTime: string;
    IsReviewed?: boolean;
    Patient_PatientId?: number;
    Weight: number;
    Symptoms: string;
}

export const DEFAULT_PATIENT: Patient = {
    patientId: 0,
    doctorId: 0,
    basicInformation: {
        firstName: "first",
        lastName: "last",
        gender: "",
        height: 0,
        dob: "",
        age: 0,
    },
    requiredDetails: {
        weight: false,
        temperature: false,
        symptoms: false,
    },
    status: [
        {
            statusId: 0,
            weight: { value: 0, unit: "" },
            temperature: { value: 0, unit: "" },
            symptoms: { value: "", unit: "" },
            lastUpdated: 0,
            isReviewed: false,
            statusTime: "",
        },
    ],
    isAllReviewed: false,
    isPrioritized: false,
};

export const DEFAULT_STATUS = {
    temperature: 37,
    weight: 80,
    symptoms: " ",
    isReviewed: false,
};

export const FILTER_OPTIONS = {
    NONE: "none",
    TEMPERATURE: "temperature",
    FLAG: "flag",
    REVIEWED: "reviewed",
    UNREVIEWED: "unreviewed",
};
