const request = require("supertest");
const app = require("../../index");
const db = require("../../config/database");
const constants = require("../../utils/constants");
const Patient = require("../../models/patient");

beforeAll(() => {
    // test DB
    db.authenticate();
});
afterAll(() => {
    // Closing the DB connection allows Jest to exit successfully.
    db.close();
});

describe("PATCH: update the list of details that the patient has to provide", () => {
    it("Returns code 400 if patient ID is not found", () => {
        const data = {
            weight: true,
            temperature: true,
            symptoms: true,
            patientId: 100000,
        };
        return request(app).patch("/doctors/updateRequiredDetails").send(data).expect(400);
    });

    it("Returns code 200 if update has been successful", () => {
        const data = {
            weight: true,
            temperature: true,
            symptoms: true,
            patientId: 3,
        };
        return request(app).patch("/doctors/updateRequiredDetails").send(data).expect(200);
    });

    it("Returns code 500 if invalid data is sent", async () => {
        const data = {};
        return request(app).patch("/doctors/updateRequiredDetails").send(data).expect(500);
    });
});

describe("GET: getting all patients of the current doctor", () => {
    it("Returns code 400 if user id is not associated to  a doctor", () => {
        const userId = 10000000;
        return request(app).get(`/doctors/getPatientsInfo/${userId}`).expect(400);
    });
    it("Returns code 200 and patient array if user is a doctor", async () => {
        const userId = 239;
        const response = await request(app).get(`/doctors/getPatientsInfo/${userId}`);
        expect(response.body).toHaveLength(2);
    });
    it("Returns the patient object with correct symptoms and lastUpdated attributes if null", async () => {
        const userId = 239;
        const response = await request(app).get(`/doctors/getPatientsInfo/${userId}`);
        expect(response.body[1].status[0].symptoms.value).toEqual("fever, sore throat");
        expect(response.body[1].status[0].lastUpdated).toEqual(0);
    });
});

describe("PATCH: update the priority of a patient as a doctor", () => {
    // Reset Mock user to original state
    afterAll(async () => {
        await Patient.update(
            {
                IsPrioritized: constants.BOOLEANS.FALSE,
            },
            {
                where: {
                    User_AccountId: "51",
                },
            }
        );
    });

    it("Returns 200: Priority is updated successfully by a doctor", async () => {
        const data = {
            accountId: 239,
            patientId: 3,
            isPrioritized: constants.BOOLEANS.TRUE,
        };
        await request(app).patch("/doctors/updatePriority").send(data).expect(200);
    });

    it("Returns 400: Priority not updated due to unexisting patient", async () => {
        const data = {
            accountId: 239,
            patientId: 0,
            isPrioritized: constants.BOOLEANS.TRUE,
        };
        await request(app).patch("/doctors/updatePriority").send(data).expect(400);
    });

    it("Returns 400: Priority not updated due to missing isPrioritized attribute", async () => {
        const data = {
            accountId: 239,
            patiendId: 3,
        };
        await request(app).patch("/doctors/updatePriority").send(data).expect(400);
    });

    it("Returns 500: Priority not updated due to missing patient attribute", async () => {
        const data = {
            accountId: 239,
            isPrioritized: constants.BOOLEANS.TRUE,
        };
        await request(app).patch("/doctors/updatePriority").send(data).expect(500);
    });

    it("Returns 401: Priority not updated due to user not being a Doctor", async () => {
        const data = {
            accountId: 51,
            patiendId: 3,
            isPrioritized: constants.BOOLEANS.TRUE,
        };
        await request(app).patch("/doctors/updatePriority").send(data).expect(401);
    });
});
