export interface Patient {
    patientId: number;
    doctorId: number;
    basicInformation: PatientBasicInformation;
    requiredDetails: RequiredDetails;
    status: PatientStatus[];
    isPrioritized: boolean;
}

export interface RequiredDetails {
    weight: boolean;
    temperature: boolean;
    symptoms: boolean;
}

export interface PatientBasicInformation {
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
}

export interface PatientStatus {
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

export const DEFAULT_PATIENT = {
    patientId: 0,
    doctorId: 0,
    basicInformation: {
        firstName: "",
        lastName: "",
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
            weight: { value: 0, unit: "" },
            temperature: { value: 0, unit: "" },
            symptoms: { value: "", unit: "" },
            lastUpdated: 0,
            isReviewed: false,
            statusTime: "",
        },
    ],
    isPrioritized: false,
};

export const DEFAULT_STATUS = {
    temperature: 37,
    weight: 80,
    symptoms: " ",
    isReviewed: false,
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
