export interface Patient {
    patientId: number;
    doctorId: number;
    basicInformation: PatientBasicInformation;
    requiredDetails: RequiredDetails;
    status: {
        weight: { value: number; unit: string };
        temperature: { value: number; unit: string };
        symptoms: { value: string; unit: string };
        lastUpdated: number;
    };
    isReviewed: boolean;
    isPrioritized: boolean;
}

export interface RequiredDetails {
    weight: boolean;
    temperature: boolean;
    symptoms: boolean;
}

export interface PatientBasicInformation {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    postalCode: string;
    city: string;
    hasCovid: boolean;
    id: string;
    gender: string;
    dob: string;
    age: number;
    height: number;
}
