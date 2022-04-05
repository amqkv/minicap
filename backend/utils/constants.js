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
    COVID_PATIENT: {
        AccountId: "1191", // constant-covid-switch@dontmodify.com
    },
    DOCTOR_ACCOUNT: {
        AccountId: "239",
    },
    UPDATE_ROLE_ACCOUNT: {
        AccountId: "828", // jfupdatetest@test.com
    },
    REJECTED_ACCOUNT: {
        AccountId: "1211",
    },
    APPOINTMENT_PATIENT_ACCOUNT: {
        PatientId: "598",
    },
    INVALID_EMAIL_ACCOUNT: {
        PatientId: "599",
    },
    // Status for the review test
    STATUS_TEST_ID: 2,
    // Patient for the review test
    STATUS_PATIENT_ID: 27,
    PATIENT_WITH_STATUS: {
        AccountId: "51",
    },
    INVALID_ACCOUNT_ID: "0",

    MESSAGE_DATA_TEST: {
        Content: "random_message_453212322446158",
        Doctor_AccountId: 109,
        Patient_AccountId: 51,
        Author_AccountId: 51,
    },
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
    // eslint-disable-next-line no-dupe-keys
    DOCTOR_ACCOUNT: {
        AccountId: "1202",
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

// Client URL
const CLIENT_URL = "http://localhost:3000";

// appointment status values
const TEST_STATUS = {
    CONFIRMED: "confirmed",
    DECLINED: "declined",
<<<<<<< HEAD
    PENDING: "pending"
}
=======
    PENDING: "pending",
};
>>>>>>> 96248b7a15152a0628224310a069897fd7845bf3

module.exports = {
    ROLE,
    TEST_CONSTANTS,
    BOOLEANS,
    MOMENT_TIMEZONE_ADJUSTMENT,
    ADMIN_EMAIL_ACCOUNT,
    DOCTOR_TEST_SUBJECTS,
    CLIENT_URL,
    TEST_STATUS,
};
