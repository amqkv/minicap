import { USER_ROLES } from "@frontend/utils/constants";

export interface link {
    label: string;
    url: string;
    roleRequired?: string;
    img: string;
}

// TODO: add url
export const links: link[] = [
    {
        label: "Forms",
        url: "/patient/patient-symptoms-daily",
        roleRequired: USER_ROLES.patient,
        img: "https://imgur.com/DkXs8lt.png",
    },
    {
        label: "Messages",
        url: "/communication/message-box",
        roleRequired: USER_ROLES.patient,
        img: "https://imgur.com/gycpeKh.png",
    },
    {
        label: "Appointments",
        url: "#",
        roleRequired: USER_ROLES.patient,
        img: "https://imgur.com/eRLbmpq.png",
    },
    {
        label: "Patients",
        url: "doctor/patient-list-overview",
        roleRequired: USER_ROLES.doctor,
        img: "https://imgur.com/DkXs8lt.png",
    },
    {
        label: "Messages",
        url: "/communication/message-list",
        roleRequired: USER_ROLES.doctor,
        img: "https://imgur.com/gycpeKh.png",
    },
    {
        label: "Appointments",
        url: "doctor/appointments-overview",
        roleRequired: USER_ROLES.doctor,
        img: "https://imgur.com/eRLbmpq.png",
    },
    {
        label: "Covid Patients",
        url: "/health-official/covid-patients",
        roleRequired: USER_ROLES.hOfficial,
        img: "https://imgur.com/eRLbmpq.png",
    },
    {
        label: "List of Covid Patients",
        url: "/immigration-officer/find-users",
        roleRequired: USER_ROLES.iOfficer,
        img: "https://imgur.com/eRLbmpq.png",
    },
    {
        // temp admin images will make new ones later probably
        label: "Manage Patients",
        url: "/admin/patient-list",
        roleRequired: USER_ROLES.admin,
        img: "https://imgur.com/DkXs8lt.png",
    },
    {
        label: "Manage Users",
        url: "/admin/user-list",
        roleRequired: USER_ROLES.admin,
        img: "https://imgur.com/DkXs8lt.png",
    },
    {
        label: "Approve Pending Users",
        url: "/admin/approve-users",
        roleRequired: USER_ROLES.admin,
        img: "https://imgur.com/DkXs8lt.png",
    },
];
