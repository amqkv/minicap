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
        text: "PATIENTS INFO",
        url: "/doctor/patient-list-overview",
        roleRequired: USER_ROLES.doctor,
    },
    {
        text: "MESSAGES",
        url: "/communication/message-list",
        roleRequired: USER_ROLES.doctor,
    },
    {
        text: "APPOINTMENTS",
        url: "/doctor/appointments-overview",
        roleRequired: USER_ROLES.doctor,
    },
    {
        text: "PATIENT FORM",
        url: "/patient/patient-symptoms-daily",
        roleRequired: USER_ROLES.patient,
    },
    {
        text: "MESSAGES",
        url: "/communication/message-box",
        roleRequired: USER_ROLES.patient,
    },
    {
        text: "SEARCH FOR USER",
        url: "/immigration-officer/find-users",
        roleRequired: USER_ROLES.iOfficer,
    },
    {
        text: "ALL PATIENTS",
        url: "/health-official/covid-patients",
        roleRequired: USER_ROLES.hOfficial,
    },
    {
        text: "QUARANTINE INFORMATION",
        url: "/patient/quarantine",
        roleRequired: USER_ROLES.patient,
    },
    {
        text: "TRACK/NOTIFY COVID CONTACTS",
        url: "/health-official/track-contact-patients",
        roleRequired: USER_ROLES.hOfficial,
    },
    {
        text: "PATIENTS TRACKING FORM",
        url: "/patient/patient-track-form",
        roleRequired: USER_ROLES.patient,
    },
];
