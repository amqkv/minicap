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
            covidChange: true,
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

describe("GET: list of all patients with their statuses", () => {
    it("Returns list", async () => {
        const response = await request(app).get(`/health-official/findUserStatus`);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    hasCovid: expect.any(Boolean),
                    firstName: expect.any(String),
                    lastName: expect.any(String),
                    email: expect.any(String),
                    phoneNumber: expect.any(String),
                    address: expect.any(String),
                    city: expect.any(String),
                    postalCode: expect.any(String),
                    id: expect.any(Number),
                    patientId: expect.any(Number),
                    isPrioritized: expect.any(Boolean),
                    gender: expect.any(String),
                    dob: expect.any(String),
                    status: expect.any(Array),
                }),
            ])
        );
    });
});
