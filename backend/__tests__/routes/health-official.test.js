const request = require("supertest");
const app = require("../../index");
const db = require("../../config/database");
const { TEST_CONSTANTS } = require("../../utils/constants");

beforeAll(() => {
    // test DB
    db.authenticate();
});
afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    await db.close();
});

describe("PATCH: list of patients from the database", () => {
    it("Returns code 200 after a good request", () => {
        const data = {
            covidChange: false,
            id: TEST_CONSTANTS.PATIENT_ACCOUNT.AccountId,
        };
        return request(app)
            .patch("/health-official/updatePatientStatus")
            .send(data)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(true);
            });
    });

    it("Returns code 400 after a bad request", () => {
        const data = {
            covidChange: false,
        };
        return request(app)
            .patch("/health-official/updatePatientStatus")
            .send(data)
            .expect("Content-Type", /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toEqual(false);
            });
    });
});
