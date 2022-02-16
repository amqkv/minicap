export interface Patient {
    patientId: number;
    doctorId: number;
    basicInformation: {
        firstName: string;
        lastName: string;
        gender: string;
        height: number;
        dob: string;
        age: number;
    };
    requiredDetails: {
        weight: boolean;
        temperature: boolean;
        symptoms: boolean;
    };
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
