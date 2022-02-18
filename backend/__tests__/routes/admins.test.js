const request = require("supertest");
const app = require("../../index");
const db = require("../../config/database");
const User = require("../../models/user");
const { TEST_CONSTANTS, BOOLEANS } = require("../../utils/constants");

beforeAll(() => {
    // test DB
    db.authenticate();
});
afterAll(() => {
    // Closing the DB connection allows Jest to exit successfully.
    db.close();
});

describe("PATCH: Assign a patient to a doctor", () => {
    it("Patient has been assigned to a doctor", () => {
        const data = {
            accountId: "17",
            patientId: "3",
            doctor_doctorId: "3",
        };
        return request(app).patch("/admins/assign-patient-doctor").send(data).expect(200);
    });

    it("PatientId not found", () => {
        const data = {
            accountId: "17",
            patientId: "0",
            doctor_doctorId: "3",
        };
        return request(app).patch("/admins/assign-patient-doctor").send(data).expect(400);
    });

    it("DoctorId not found", () => {
        const data = {
            accountId: "17",
            patientId: "3",
            doctor_doctorId: "0",
        };
        return request(app).patch("/admins/assign-patient-doctor").send(data).expect(400);
    });

    it("User is not signed in", () => {
        const data = {
            accountId: "0",
            patientId: "3",
            doctor_doctorId: "3",
        };
        return request(app).patch("/admins/assign-patient-doctor").send(data).expect(403);
    });

    it("AccountId is not an admin", () => {
        const data = {
            accountId: "51",
            patientId: "3",
            doctor_doctorId: "3",
        };
        return request(app).patch("/admins/assign-patient-doctor").send(data).expect(401);
    });
});

describe("PATCH: Update user role", () => {
    // Change test user back to Patient after each tests
    afterEach(async () => {
        await User.update(
            {
                Role: "Patient",
            },
            {
                where: {
                    AccountId: "51",
                },
            }
        );
    });

    it("Update successfuly the role of a user as an Admin", () => {
        const data = {
            accountId: "17",
            userId: "51",
            oldRole: "Patient",
            newRole: "HealthOfficial",
        };
        return request(app).patch("/admins/update-role").send(data).expect(200);
    });

    it("Attempt to update to the same role as an Admin", () => {
        const data = {
            accountId: "17",
            userId: "51",
            oldRole: "Patient",
            newRole: "Patient",
        };
        return request(app).patch("/admins/update-role").send(data).expect(200);
    });

    it("Attempt to update a non-existing user as an Admin", () => {
        const data = {
            accountId: "17",
            userId: "0",
            oldRole: "Patient",
            newRole: "HealthOfficial",
        };
        return request(app).patch("/admins/update-role").send(data).expect(400);
    });

    it("Attempt to update a non-existing user as a Non-Admin", () => {
        const data = {
            accountId: "51",
            userId: "51",
            oldRole: "Patient",
            newRole: "HealthOfficial",
        };
        return request(app).patch("/admins/update-role").send(data).expect(401);
    });

    it("Attempt to update a non-existing user as a Non-existing user", () => {
        const data = {
            accountId: "0",
            userId: "51",
            oldRole: "Patient",
            newRole: "HealthOfficial",
        };
        return request(app).patch("/admins/update-role").send(data).expect(403);
    });
});

describe("Confirm User Account", () => {
    afterEach(() => { // reset account used for test
        const reset_data = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.AccountId,
            userId: TEST_CONSTANTS.UNCONFIRMED_ACCOUNT.AccountId,
            ConfirmedFlag: BOOLEANS.FALSE
        };
        return request(app).patch("/admins/confirm-user-account").send(reset_data);

    });
    it("Attempt to confirm an UNCONFIRMED account as an ADMIN", () => {
        const data = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.AccountId,
            userId: TEST_CONSTANTS.UNCONFIRMED_ACCOUNT.AccountId,
            ConfirmedFlag: BOOLEANS.TRUE
        };
        console.log(data);
        return request(app).patch("/admins/confirm-user-account").send(data).expect(200);
    });
    it("Attempt to confirm an UNCONFIRMED account as an ADMIN but passing an INVALID TYPE", () => {
        const data = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.AccountId,
            userId: TEST_CONSTANTS.UNCONFIRMED_ACCOUNT.AccountId,
            ConfirmedFlag: "checkers"
        };
        console.log(data);
        return request(app).patch("/admins/confirm-user-account").send(data).expect(400);
    });
    it("Attempts to confirm an UNCONFIRMED account as NOT ADMIN", () => {
        const data = {
            accountId: TEST_CONSTANTS.UNCONFIRMED_ACCOUNT.AccountId,
            userId: TEST_CONSTANTS.UNCONFIRMED_ACCOUNT.AccountId,
            ConfirmedFlag: BOOLEANS.TRUE
        };
        return request(app).patch("/admins/confirm-user-account").send(data).expect(401);
    });
});
