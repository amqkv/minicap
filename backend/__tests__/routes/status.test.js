const request = require("supertest");
const db = require("../../config/database");
const app = require("../../index");
const Status = require("../../models/status");

const testStatus = {
    accountId: 678,
    temperature: 40,
    statusTime: "2000-09-22 00:00:00.000",
    isReviewed: "0",
    weight: 100,
    symptoms: "My head hurts",
};

beforeAll(() => {
    // test DB
    db.authenticate();
});
afterAll(async () => {
    await Status.destroy({
        where: {
            StatusTime: [testStatus.statusTime],
        },
    });

    // Closing the DB connection allows Jest to exit successfully.
    db.close();
});

describe("GET: getting all status for this user", () => {
    it("Returns code 400 if user id is not associated to a user", () => {
        const userId = 10000000;
        return request(app).get(`/status/getAllStatus/${userId}`).expect(400);
    });

    // TODO: Fix unit test
    // it("Returns code 200 and array of status", async () => {
    //     const userId = 51;
    //     const response = await request(app).get(`/status/getAllStatus/${userId}`);
    //     expect(response.body).toHaveLength(5);
    // });
});

describe("POST: Adding a new status", () => {
    it("User fills the status form for the first time in the day", async () => {
        await request(app)
            .post("/status/addStatus")
            .send(testStatus)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        StatusId: expect.any(Number),
                        Temperature: expect.any(Number),
                        StatusTime: expect.any(String),
                        IsReviewed: expect.any(Boolean),
                        Patient_PatientId: expect.any(Number),
                        Weight: expect.any(Number),
                        Symptoms: expect.any(String),
                    })
                );
            });
    });

    it("User fills the status form and updates the status for the day", async () => {
        await request(app)
            .post("/status/addStatus")
            .send(testStatus)
            .expect(200)
            .then(response => {
                expect(response.body[0]).toEqual(
                    expect.objectContaining({
                        StatusId: expect.any(Number),
                        Temperature: expect.any(Number),
                        StatusTime: expect.any(String),
                        IsReviewed: expect.any(Boolean),
                        Patient_PatientId: expect.any(Number),
                        Weight: expect.any(Number),
                        Symptoms: expect.any(String),
                    })
                );
            });
    });
});
