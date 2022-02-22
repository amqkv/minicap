import { RequiredDetails } from "@frontend/models/patient";

export const DEFAULT_REQUIRED_DETAILS = {
    Weight: true,
    Symptoms: true,
    Temperature: true,
};

export const DEFAULT_USER_SIMPLE = {
    AccountId: null,
    FirstName: "firstName",
    LastName: "lastName",
    Role: "Patient",
};

export const DEFAULT_PAST_CONDITIONS = [
    {
        Temperature: 35,
        StatusTime: "2022-02-01",
        Weight: 91,
        Symptoms: "Cough",
    },
    {
        Temperature: 36,
        StatusTime: "2022-02-07",
        Weight: 90,
        Symptoms: "Sore throat",
    },
    {
        Temperature: 39,
        StatusTime: "2022-02-15",
        Weight: 85,
        Symptoms: "Help me",
    },
];

export const IMMIGRATION_OFFICER_MOCK_PATIENTS = [
    {
        firstName: "Bing Bong",
        lastName: "Big",
        email: "boiboibib@gamil.com",
        address: "BIGBONG",
        phoneNumber: "41414141414",
        postalCode: "h1h1h1",
        city: "bongbong",
        hasCovid: false,
        id: "3",
        gender: "bing bong",
        dob: "2000-08-28",
        age: 21,
        height: 89,
    },
    {
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob.johnson@gmail.com",
        address: "123 sesame street",
        phoneNumber: "123 456 7890",
        postalCode: "1k1 k1k",
        city: "Whatevercity",
        hasCovid: true,
        id: "2",
        gender: "attack helicopter",
        dob: "2012-12-12",
        age: 12,
        height: 12,
    },
];

export const REQUIRED_DETAILS: RequiredDetails = {
    weight: true,
    temperature: false,
    symptoms: true,
};
