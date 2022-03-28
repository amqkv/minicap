const request = require("supertest");
const app = require("../../index");
const db = require("../../config/database");
const { TEST_CONSTANTS } = require("../../utils/constants");

beforeAll(() => {
    // test DB
    db.authenticate();
});
afterAll(() => {
    // Closing the DB connection allows Jest to exit successfully.
    db.close();
});

describe("Test get Patient details route ", () => {
    it("connect to /getRequiredDetails/:AccountId with valid patient id", () => {
        const url = `/patients/getRequiredDetails/${TEST_CONSTANTS.PATIENT_ACCOUNT.AccountId}`;
        return request(app).get(url).expect(200).expect("Content-Type", /json/);
    });

    // @todo ERROR CATCHING IN THIS ROUTE
    // it("connect to /getRequiredDetails/:AccountId with an invalid id", () => {
    //     const url = `/patients/getRequiredDetails/${TEST_CONSTANTS.PATIENT_ACCOUNT.AccountId}`;
    //     return expect(true).toBe(true);
    // });
});

describe("GET: get assigned doctor of current patient", () => {
    it("Returns code 200 and assigned doctor of patient", async () => {
        const userId = TEST_CONSTANTS.PATIENT_ACCOUNT.AccountId;
        await request(app).get(`/patients/getAssignedDoctor/${userId}`).expect(200);
    });
    it("Returns code 400 if user is not a patient", async () => {
        const userId = 0;
        await request(app).get(`/patients/getAssignedDoctor/${userId}`).expect(400);
    });
});

describe("Test get patient hasCovid", () => {
    it("connect to /isPositive/:accountId with valid patient id", async () => {
        const url = "/patients/isPositive/" + TEST_CONSTANTS.PATIENT_ACCOUNT.AccountId;
        const data = await request(app)
            .get(url)
            .expect(200)
            .expect("Content-Type", /json/)
            .then(response => response.body);
        expect(data).toEqual(true);
    });

    it("connect to /isPositive/:accountId with invalid patient id", async () => {
        const url = "/patients/isPositive/" + TEST_CONSTANTS.PATIENT_ACCOUNT.TESTER_ADMIN;
        const data = await request(app)
            .get(url)
            .expect(400)
            .expect("Content-Type", /json/)
            .then(response => response.body);
        expect(data).toEqual(false);
    });
});
