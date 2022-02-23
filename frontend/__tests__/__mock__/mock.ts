import { RequiredDetails } from "@frontend/models/patient";

export const DEFAULT_REQUIRED_DETAILS = {
    Weight: true,
    Symptoms: true,
    Temperature: true,
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

<<<<<<< HEAD

=======
>>>>>>> c65fa0f872c71a6aaa2912ef1af3958013725d8c
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

<<<<<<< HEAD
=======
export const SINGLE_PATIENT_INFO_SIMPLE = {
    accountId: null,
    patientId: null,
    firstName: "firstName",
    lastName: "lastName",
    doctorId: null,
};

export const DOCTOR_LIST_SIMPLE = [
    {
        firstName: "Dra",
        lastName: "LastDoctor",
        doctorId: 1,
    },
    { firstName: "Doc", lastName: "LastDoctor2", doctorId: 2 },
];

export const PATIENT_INFO_SIMPLE = [
    {
        accountId: 100,
        firstName: "Dra",
        lastName: "LastDoctor",
        doctorId: 1,
        patients: [
            {
                accountId: 1,
                patientId: 1,
                firstName: "Name",
                lastName: "Last",
                doctorId: 1,
            },
            {
                accountId: 2,
                patientId: 2,
                firstName: "Name2",
                lastName: "Last2",
                doctorId: 1,
            },
        ],
    },
];

export const UNASSIGNED_PATIENT_INFO_SIMPLE = [
    {
        accountId: 13,
        patientId: 3,
        firstName: "FirstUn",
        lastName: "LastUn",
        doctorId: -1,
    },
];
>>>>>>> c65fa0f872c71a6aaa2912ef1af3958013725d8c

export const REQUIRED_DETAILS: RequiredDetails = {
    weight: true,
    temperature: false,
    symptoms: true,
};
