const request = require("supertest");
const app = require("../../index");
const db = require("../../config/database");

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    db.close();
    done();
});

describe("PATCH: Assign a patient to a doctor", () => {
    it("Patient has been assigned to a doctor", () => {
        let data = {
            accountId: "17",
            patientId: "13",
            doctor_doctorId: "3",
        };
        return request(app).patch("/admins/assign-patient-doctor").send(data).expect(200);
    });

    it("PatientId not found", () => {
        let data = {
            accountId: "17",
            patientId: "1",
            doctor_doctorId: "3",
        };
        return request(app).patch("/admins/assign-patient-doctor").send(data).expect(400);
    });

    it("DoctorId not found", () => {
        let data = {
            accountId: "17",
            patientId: "13",
            doctor_doctorId: "0",
        };
        return request(app).patch("/admins/assign-patient-doctor").send(data).expect(400);
    });

    it("User is not signed in", () => {
        let data = {
            accountId: "0",
            patientId: "13",
            doctor_doctorId: "3",
        };
        return request(app).patch("/admins/assign-patient-doctor").send(data).expect(403);
    });

    it("AccountId is not an admin", () => {
        let data = {
            accountId: "87",
            patientId: "13",
            doctor_doctorId: "3",
        };
        return request(app).patch("/admins/assign-patient-doctor").send(data).expect(401);
    });
});
