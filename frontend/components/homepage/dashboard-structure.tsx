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
        url: "/patient/forms",
        roleRequired: USER_ROLES.patient,
        img: "https://imgur.com/DkXs8lt.png",
    },
    {
        label: "Messages",
        url: "#",
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
        url: "doctor/patient-info",
        roleRequired: USER_ROLES.doctor,
        img: "https://imgur.com/DkXs8lt.png",
    },
    {
        label: "Messages",
        url: "#",
        roleRequired: USER_ROLES.doctor,
        img: "https://imgur.com/gycpeKh.png",
    },
    {
        label: "Appointments",
        url: "#",
        roleRequired: USER_ROLES.doctor,
        img: "https://imgur.com/eRLbmpq.png",
    },
];