const ROLE = {
    ADMIN: "Admin",
    DOCTOR: "Doctor",
    HEALTH_OFFICIAL: "Health Official",
    IMMIGRATION_OFFICER: "ImmigrationOfficer",
    PATIENT: "Patient",
};

const TEST_CONSTANTS = {
    TESTER_ADMIN: {
        AccountId: "78", // this is sitetester@email.com in the DB, DON'T DELETE IT
        Role: "Admin",
    },
    HEALTH_OFFICIAL_ACCOUNT: {
        AccountId: "1190", // constant-healthofficial@dontmodify.com
        Role: "Health Official",
    },
    IMMIGRATION_OFFICER_ACCOUNT: {
        AccountId: "1216", // constant-immigration@dontmodify.com
        Role: "ImmigrationOfficer",
    },
    DOCTOR_ASSIGN_ADMIN_TEST: {
        Doctor_Id: "19", // user id 1197 constant-doctor4admin@dontmodify.com
        Role: "Doctor",
        Patient_Id: "590", // user id 1198 constant-patient-unassigned@dontmodify.com
    },
    UNCONFIRMED_ACCOUNT: {
        AccountId: "1215", // forever-unconfirmed@dontmodify.com
    },
    PATIENT_ACCOUNT: {
        AccountId: "1201", // constant-patient-main@dontmodify.com
    },
    UPDATE_ROLE_ACCOUNT: {
        AccountId: "828", // jfupdatetest@test.com
    },
    REJECTED_ACCOUNT: {
        AccountId: "859",
    },
    // Status for the review test
    STATUS_TEST_ID: 2,
    // Patient for the review test
    STATUS_PATIENT_ID: 27,
    INVALID_ACCOUNT_ID: "0",
};

const DOCTOR_TEST_SUBJECTS = {
    DOCTOR_INFO: {
        AccountId: "1192", // constant-doctor@dontmodify.com
        Role: "Doctor",
        Doctor_Id: "18",
    },
    PATIENT_ONE: {
        AccountId: "1193",
        Patient_Id: "585",
        Doctor_DoctorId: "18",
    },
    PATIENT_TWO: {
        AccountId: "1194",
        Patient_Id: "586",
        Doctor_DoctorId: "18",
    },
    PATIENT_THREE: {
        AccountId: "1195",
        Patient_Id: "587",
        Doctor_DoctorId: "18",
    },
    PATIENT_FOUR: {
        AccountId: "1196",
        Patient_Id: "588",
        Doctor_DoctorId: "18",
    },
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

module.exports = {
    ROLE,
    TEST_CONSTANTS,
    BOOLEANS,
    MOMENT_TIMEZONE_ADJUSTMENT,
    ADMIN_EMAIL_ACCOUNT,
    DOCTOR_TEST_SUBJECTS,
};
