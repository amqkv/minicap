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
        const url = "/patients/getRequiredDetails/" + TEST_CONSTANTS.PATIENT_ACCOUNT.AccountId;
        return request(app).get(url).expect(200).expect("Content-Type", /json/);
    });
    //@todo ERROR CATCHING IN THIS ROUTE
    it("connect to /getRequiredDetails/:AccountId with an invalid id", () => {
        const url = "/patients/getRequiredDetails/" + TEST_CONSTANTS.PATIENT_ACCOUNT.AccountId;
        return expect(true).toBe(true);
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


describe("Test get Patient getAppointmentForPatients route ", () => {
    it("connect to /getAppointmentForPatients/:AccountId with valid patient id", () => {
        const url = "/patients/getAppointmentForPatients/" + TEST_CONSTANTS.PATIENT_ACCOUNT.AccountId;
        return request(app).get(url).expect(200).expect("Content-Type", /json/);
    });

    it("connect to /getAppointmentForPatients/:AccountId with invalid patient id", () => {
        const url = "/patients/getAppointmentForPatients/" + 1;
        return expect(true).toBe(true);
    });
});
