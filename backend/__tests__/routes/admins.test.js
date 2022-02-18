const request = require("supertest");
const app = require("../../index");
const db = require("../../config/database");
<<<<<<< HEAD

beforeAll(() => {
    //test DB
=======
const User = require("../../models/user");

beforeAll(() => {
    // test DB
>>>>>>> origin/main
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
<<<<<<< HEAD
=======

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
>>>>>>> origin/main
