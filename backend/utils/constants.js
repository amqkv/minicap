const ROLE = {
    ADMIN: "Admin",
    DOCTOR: "Doctor",
    HEALTH_OFFICIAL: "HealthOfficial",
    IMMIGRATION_OFFICER: "ImmigrationOfficer",
    PATIENT: "Patient",
};

const TEST_CONSTANTS = {
    // admin account
    TESTER_ADMIN: {
        AccountId: "17", // this is nicolas@gmail.com in the DB, DON'T DELETE IT
        Role: "Admin",
    },
    UNCONFIRMED_ACCOUNT: {
        AccountId: "1", // this is test@test.com
    },
    PATIENT_ACCOUNT: {
        AccountId: "51",
    },
    DOCTOR_ACCOUNT: {
        AccountId: "239",
    },
    UPDATE_ROLE_ACCOUNT: {
        AccountId: "828",
    },
    REJECTED_ACCOUNT: {
        AccountId: "859",
    },
    // Status for the review test
    STATUS_TEST_ID: 2,
    // Patient for the review test
    STATUS_PATIENT_ID: 27,
};

// Email used to send rejection to rejected users
const ADMIN_EMAIL_ACCOUNT = "cocotracker@outlook.com";

// sequelize doesnt like BOOLEAN which translates to an INTEGER in the request.
// mostly for the tests right now, the function themselves accept true BOOLEAN values
const BOOLEANS = {
    TRUE: "1",
    FALSE: "0",
};

// Value to adjust the timezone linked to Moment
const MOMENT_TIMEZONE_ADJUSTMENT = 5;

// Client URL
const CLIENT_URL = "http://localhost:3000";

module.exports = {
    ROLE,
    TEST_CONSTANTS,
    BOOLEANS,
    MOMENT_TIMEZONE_ADJUSTMENT,
    ADMIN_EMAIL_ACCOUNT,
    CLIENT_URL,
};
