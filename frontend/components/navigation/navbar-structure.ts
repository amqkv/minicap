import { USER_ROLES } from "@frontend/utils/constants";

export interface link {
    text: string;
    url: string;
    roleRequired?: string;
}

export const links: link[] = [
    { text: "HOME", url: "/" },
    {
        text: "PATIENT LIST",
        url: "/admin/patient-list",
        roleRequired: USER_ROLES.admin,
    },
    {
        text: "USER LIST",
        url: "/admin/user-list",
        roleRequired: USER_ROLES.admin,
    },
    {
        text: "APPROVE USERS",
        url: "/admin/approve-users",
        roleRequired: USER_ROLES.admin,
    },
    {
        text: "PATIENT INFO",
        url: "/doctor/patientinfo",
        roleRequired: USER_ROLES.doctor,
    },
    {
        text: "PATIENT FORM",
        url: "/patient/patient-symptoms-daily",
        roleRequired: USER_ROLES.patient,
    },
    {
        text: "SEACH FOR USER",
        url: "/immigration-officer/find-users",
        roleRequired: USER_ROLES.iOfficer,
    }
];
