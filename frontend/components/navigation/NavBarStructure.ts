import {USER_ROLES} from "@frontend/utils/constants";

export const Links = [
    { text: 'HOME', url: '/' },
    {
        text: 'USER LIST',
        url: '/admin/user-list',
        roleRequired: USER_ROLES.admin,
    },
    {
        text: 'APPROVE USERS',
        url: '/admin/approve-users',
        roleRequired: USER_ROLES.admin,
    },
    {
        text: 'PATIENT INFO',
        url: '/doctor/patientinfo',
        roleRequired: USER_ROLES.doctor,
    },
];