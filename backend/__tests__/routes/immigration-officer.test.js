const request = require("supertest");
const app = require("../../index");
const db = require("../../config/database");

beforeAll(() => {
    // test DB
    db.authenticate();
});
afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    await db.close();
});

describe("GET:list of patients from the database", () => {
    it("Returns code 200 after querying the list of patients", () =>
        request(app)
            .get("/immigration-officer/findUsersStatus")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            hasCovid: expect.any(Boolean),
                            firstName: expect.any(String),
                            lastName: expect.any(String),
                            gender: expect.any(String),
                            dob: expect.any(String),
                            address: expect.any(String),
                            city: expect.any(String),
                            phoneNumber: expect.any(String),
                            email: expect.any(String),
                            postalCode: expect.any(String),
                            id: expect.any(Number),
                        }),
                    ])
                );
            }));
});

describe("GET:count of patients from the database", () => {
    it("Returns code 200 after querying the count of patients", () =>
        request(app)
            .get("/immigration-officer/countUsersStatus")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            "COVID Positive Patients": expect.any(Number),
                            "COVID Negative Patients": expect.any(Number),
                        }),
                    ])
                );
            }));
});
