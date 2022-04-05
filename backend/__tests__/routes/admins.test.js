const request = require("supertest");
const app = require("../../index");
const db = require("../../config/database");
const User = require("../../models/user");
const { TEST_CONSTANTS, BOOLEANS, ROLE } = require("../../utils/constants");

beforeAll(() => {
    // test DB
    db.authenticate();
});
afterAll(() => {
    // Closing the DB connection allows Jest to exit successfully.
    db.close();
});

describe("Test the test admin route ", () => {
    it("user is admin", () => {
        const data = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.AccountId,
        };
        return request(app).get("/admins/").send(data).expect(200);
    });
    it("user is NOT admin", () => {
        const data = {
            accountId: TEST_CONSTANTS.UNCONFIRMED_ACCOUNT.AccountId,
        };
        return request(app).get("/admins/").send(data).expect(401);
    });
});

describe("PATCH: Assign a patient to a doctor", () => {
    it("Patient has been assigned to a doctor", () => {
        const data = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.AccountId,
            patientId: TEST_CONSTANTS.DOCTOR_ASSIGN_ADMIN_TEST.Patient_Id,
            doctor_doctorId: TEST_CONSTANTS.DOCTOR_ASSIGN_ADMIN_TEST.Doctor_Id,
        };
        return request(app).patch("/admins/assign-patient-doctor").send(data).expect(200);
    });
    it("Patient has been un-assigned from doctor", () => {
        const data = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.AccountId,
            patientId: TEST_CONSTANTS.DOCTOR_ASSIGN_ADMIN_TEST.Patient_Id,
            doctor_doctorId: TEST_CONSTANTS.DOCTOR_ASSIGN_ADMIN_TEST.Doctor_Id,
        };
        return request(app).patch("/admins/assign-patient-doctor").send(data).expect(200);
    });

    it("PatientId not found", () => {
        const data = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.AccountId,
            patientId: TEST_CONSTANTS.INVALID_ACCOUNT_ID,
            doctor_doctorId: TEST_CONSTANTS.DOCTOR_ASSIGN_ADMIN_TEST.Doctor_Id,
        };
        return request(app).patch("/admins/assign-patient-doctor").send(data).expect(400);
    });

    it("DoctorId not found", () => {
        const data = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.accountId,
            patientId: TEST_CONSTANTS.DOCTOR_ASSIGN_ADMIN_TEST.Patient_Id,
            doctor_doctorId: TEST_CONSTANTS.INVALID_ACCOUNT_ID,
        };
        return request(app).patch("/admins/assign-patient-doctor").send(data).expect(400);
    });

    it("User is not signed in", () => {
        const data = {
            accountId: TEST_CONSTANTS.INVALID_ACCOUNT_ID,
            patientId: TEST_CONSTANTS.DOCTOR_ASSIGN_ADMIN_TEST.Patient_Id,
            doctor_doctorId: TEST_CONSTANTS.DOCTOR_ASSIGN_ADMIN_TEST.Doctor_Id,
        };
        return request(app).patch("/admins/assign-patient-doctor").send(data).expect(403);
    });

    it("AccountId is not an admin", () => {
        const data = {
            accountId: TEST_CONSTANTS.PATIENT_ACCOUNT,
            patientId: TEST_CONSTANTS.DOCTOR_ASSIGN_ADMIN_TEST.Patient_Id,
            doctor_doctorId: TEST_CONSTANTS.DOCTOR_ASSIGN_ADMIN_TEST.Doctor_Id,
        };
        return request(app).patch("/admins/assign-patient-doctor").send(data).expect(403);
    });
});

describe("PATCH: Update user role", () => {
    // Change test user back to Patient after each tests
    afterEach(async () => {
        await User.update(
            {
                Role: ROLE.PATIENT,
            },
            {
                where: {
                    AccountId: TEST_CONSTANTS.UPDATE_ROLE_ACCOUNT.AccountId,
                },
            }
        );
    });

    it("Update successfuly the role of a user as an Admin", () => {
        const data = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.AccountId,
            userId: TEST_CONSTANTS.UPDATE_ROLE_ACCOUNT.AccountId,
            oldRole: ROLE.PATIENT,
            newRole: ROLE.HEALTH_OFFICIAL,
        };
        return request(app).patch("/admins/update-role").send(data).expect(200);
    });

    it("Attempt to update to the same role as an Admin", () => {
        const data = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.AccountId,
            userId: TEST_CONSTANTS.UPDATE_ROLE_ACCOUNT.AccountId,
            oldRole: ROLE.PATIENT,
            newRole: ROLE.PATIENT,
        };
        return request(app).patch("/admins/update-role").send(data).expect(200);
    });

    it("Attempt to update a non-existing user as an Admin", () => {
        const data = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.AccountId,
            userId: TEST_CONSTANTS.INVALID_ACCOUNT_ID,
            oldRole: ROLE.PATIENT,
            newRole: ROLE.IMMIGRATION_OFFICER,
        };
        return request(app).patch("/admins/update-role").send(data).expect(400);
    });

    it("Attempt to update a non-existing user as a Non-Admin", () => {
        const data = {
            accountId: TEST_CONSTANTS.UPDATE_ROLE_ACCOUNT.AccountId,
            userId: TEST_CONSTANTS.INVALID_ACCOUNT_ID,
            oldRole: ROLE.PATIENT,
            newRole: ROLE.IMMIGRATION_OFFICER,
        };
        return request(app).patch("/admins/update-role").send(data).expect(401);
    });

    it("Attempt to update a non-existing user as a Non-existing user", () => {
        const data = {
            accountId: TEST_CONSTANTS.INVALID_ACCOUNT_ID,
            userId: TEST_CONSTANTS.INVALID_ACCOUNT_ID,
            oldRole: ROLE.PATIENT,
            newRole: ROLE.IMMIGRATION_OFFICER,
        };
        return request(app).patch("/admins/update-role").send(data).expect(403);
    });
});

describe("Confirm User Account", () => {
    afterEach(() => {
        // reset account used for test
        const resetData = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.AccountId,
            userId: TEST_CONSTANTS.UNCONFIRMED_ACCOUNT.AccountId,
            ConfirmedFlag: BOOLEANS.FALSE,
            RejectedFlag: BOOLEANS.FALSE,
        };
        return request(app).patch("/admins/confirm-user-account").send(resetData);
    });
    it("Attempt to confirm an UNCONFIRMED account as an ADMIN", () => {
        const data = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.AccountId,
            userId: TEST_CONSTANTS.UNCONFIRMED_ACCOUNT.AccountId,
            ConfirmedFlag: BOOLEANS.TRUE,
        };
        return request(app).patch("/admins/confirm-user-account").send(data).expect(200);
    });
    it("Attempt to confirm an UNCONFIRMED account as an ADMIN but passing an INVALID TYPE", () => {
        const data = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.AccountId,
            userId: TEST_CONSTANTS.UNCONFIRMED_ACCOUNT.AccountId,
            ConfirmedFlag: "checkers",
        };
        return request(app).patch("/admins/confirm-user-account").send(data).expect(400);
    });
    it("Attempts to confirm an UNCONFIRMED account as NON ADMIN", () => {
        const data = {
            accountId: TEST_CONSTANTS.UNCONFIRMED_ACCOUNT.AccountId,
            userId: TEST_CONSTANTS.UNCONFIRMED_ACCOUNT.AccountId,
            ConfirmedFlag: BOOLEANS.TRUE,
        };
        return request(app).patch("/admins/confirm-user-account").send(data).expect(401);
    });
});

describe("Reject User Account", () => {
    afterEach(() => {
        // reset account used for test
        const resetData = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.AccountId,
            userId: TEST_CONSTANTS.REJECTED_ACCOUNT.AccountId,
            RejectedFlag: BOOLEANS.FALSE,
        };
        return request(app).patch("/admins/reject-user-account").send(resetData);
    });
    it("Attempts to reject an UNCONFIRMED account as an ADMIN", () => {
        const data = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.AccountId,
            userId: TEST_CONSTANTS.REJECTED_ACCOUNT.AccountId,
            rejectedFlag: BOOLEANS.TRUE,
        };
        return request(app).patch("/admins/reject-user-account").send(data).expect(200);
    });
    it("Attempts to reject a non-existing account as ADMIN", () => {
        const data = {
            accountId: TEST_CONSTANTS.TESTER_ADMIN.AccountId,
            userId: TEST_CONSTANTS.INVALID_ACCOUNT_ID,
            rejectedFlag: BOOLEANS.FALSE,
        };
        return request(app).patch("/admins/reject-user-account").send(data).expect(400);
    });
    it("Attempts to reject an UNCONFIRMED account as NON ADMIN", () => {
        const data = {
            accountId: TEST_CONSTANTS.UNCONFIRMED_ACCOUNT.AccountId,
            userId: TEST_CONSTANTS.REJECTED_ACCOUNT.AccountId,
            rejectedFlag: BOOLEANS.FALSE,
        };
        return request(app).patch("/admins/reject-user-account").send(data).expect(401);
    });
});

describe("GET: Get Doctors with their associated Patients and Unassigned Patients", () => {
    it("Retrieve the data successfully", async () => {
        const data = await request(app)
            .get("/admins/patients-doctors/")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => response.body);
        expect(data).toEqual(
            expect.objectContaining({
                assigned: expect.arrayContaining([
                    expect.objectContaining({
                        accountId: expect.any(Number),
                        firstName: expect.any(String),
                        lastName: expect.any(String),
                        doctorId: expect.any(Number),
                        patients: expect.any(Array),
                    }),
                ]),
                unassigned: expect.arrayContaining([
                    expect.objectContaining({
                        accountId: expect.any(Number),
                        firstName: expect.any(String),
                        lastName: expect.any(String),
                        patientId: expect.any(Number),
                        doctorId: null,
                    }),
                ]),
            })
        );
    });
});

describe("GET:fetch admin dashboard stats", () => {
    it("Returns code 200 after querying the count of unassigned patients and pending accounts", () =>
        request(app)
            .get("/admins/get-dashboard-stats")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        unassignedPatientsCount: expect.any(Number),
                        pendingCount: expect.any(Number),
                    })
                );
            }));
});
