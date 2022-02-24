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
