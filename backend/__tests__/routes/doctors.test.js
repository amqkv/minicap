const request = require("supertest");
const app = require("../../index");
const db = require("../../config/database");

beforeAll(() => {
    // test DB
    db.authenticate();
});
afterAll(() => {
    // Closing the DB connection allows Jest to exit successfully.
    db.close();
});

describe("PATCH: update the list of details that the patient has to provide", () => {
    it("Returns code 400 if patient ID is not found in the database", () => {
        const data = {
            weight: true,
            temperature: true,
            symptoms: true,
            patientId: -1,
        };
        return request(app).patch("doctors/updateRequiredDetails").send(data).expect(500);
    });
});
