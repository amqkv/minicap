export interface CardProps {
    label: string;
    image?: string;
    url: string;
    style?: Object;
}

export interface CardPatientProps {
    label: string;
    temperature: number;
    weight: number;
    symptoms: string;
}

export interface StatusDataProps {
    StatusId: number;
    Temperature: number;
    StatusTime: string;
    IsReviewed: boolean;
    Patient_PatientId: number;
    Weight: number;
    Symptoms: string;
}
