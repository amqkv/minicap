export const MAIN_COLOR = "#FD9993";
export const WEBSITE_NAME = "CoCo Tracker";
export const USER_ROLES_SIGN_IN = ["Doctor", "Health Official", "Immigration Officer", "Patient"];

export enum USER_ROLES {
    doctor = "Doctor",
    hOfficial = "Health Official",
    patient = "Patient",
    iOfficer = "ImmigrationOfficer",
    admin = "Admin",
}

// sequelize doesnt like BOOLEAN which translates to an INTEGER in the request.
// mostly for the tests right now, the function themselves accept true BOOLEAN values
export const BOOLEANS = {
    TRUE: "1",
    FALSE: "0",
};

export const DAY = {
    ALL: "all",
};

const dev = process.env.NODE_ENV !== "production";
export const SOCKET_URL = dev ? "http://localhost:3001" : "https://coco-tracker-api.herokuapp.com";
