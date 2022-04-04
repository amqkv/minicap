const request = require("supertest");
const db = require("../../config/database");
const app = require("../../index");
const Status = require("../../models/status");
const { TEST_CONSTANTS } = require("../../utils/constants");

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
        const userId = TEST_CONSTANTS.INVALID_ACCOUNT_ID;
        return request(app).get(`/status/getAllStatus/${userId}`).expect(400);
    });

    it("Returns code 200 and array of status", async () => {
        const userId = TEST_CONSTANTS.PATIENT_WITH_STATUS.AccountId;
        const response = await request(app).get(`/status/getAllStatus/${userId}`);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IsReviewed: expect.any(Boolean),
                    Patient_PatientId: expect.any(Number),
                    StatusId: expect.any(Number),
                    StatusTime: expect.any(String),
                    Symptoms: expect.any(String),
                    Temperature: expect.any(Number),
                    Weight: expect.any(Number),
                }),
            ])
        );
    });
});

describe("GET: getting all status for this user for charts", () => {
    it("Returns code 400 if user id is not associated to a user", () => {
        const userId = TEST_CONSTANTS.INVALID_ACCOUNT_ID;
        return request(app).get(`/status/getAllStatusChart/${userId}`).expect(400);
    });

    it("Returns code 200 and array of status", async () => {
        const userId = TEST_CONSTANTS.PATIENT_WITH_STATUS.AccountId;
        const response = await request(app).get(`/status/getAllStatusChart/${userId}`);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IsReviewed: expect.any(Boolean),
                    Patient_PatientId: expect.any(Number),
                    StatusId: expect.any(Number),
                    StatusTime: expect.any(String),
                    Symptoms: expect.any(String),
                    Temperature: expect.any(Number),
                    Weight: expect.any(Number),
                }),
            ])
        );
    });
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
describe("PATCH: Turn status to reviewed", () => {
    it("review a single status", async () => {
        const statusId = TEST_CONSTANTS.STATUS_TEST_ID;
        await request(app).patch("/status/review-status").send({ statusId }).expect(200);
    });

    it("review all status of a user", async () => {
        const patientId = TEST_CONSTANTS.STATUS_PATIENT_ID;
        await request(app).patch("/status/review-status/all").send({ patientId }).expect(200);
    });

    it("return error on review a single status", async () => {
        const patientId = TEST_CONSTANTS.STATUS_PATIENT_ID;
        await request(app).patch("/status/review-status").send({ patientId }).expect(400);
    });

    it("return error review all status of a user", async () => {
        const statusId = TEST_CONSTANTS.STATUS_TEST_ID;
        await request(app).patch("/status/review-status/all").send({ statusId }).expect(400);
    });
});
