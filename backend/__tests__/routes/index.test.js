const request = require("supertest");
const app = require("../../index");
const db = require("../../config/database");

jest.useFakeTimers()

beforeAll(() => {
    // test DB
    db.authenticate();
});
afterAll(() => {
    // Closing the DB connection allows Jest to exit successfully.
    db.close();
});


describe("Test homepage route ", () => {
    it("connect to /", () => {
        return request(app).get("/").send().expect(200); 
    });
});
