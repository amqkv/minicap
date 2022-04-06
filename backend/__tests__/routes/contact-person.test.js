const request = require("supertest");
const app = require("../../index");
const db = require("../../config/database");
const { TEST_CONSTANTS, ADMIN_EMAIL_ACCOUNT } = require("../../utils/constants");

const fakePatient = {
    firstName: "ok",
    lastName: "cool",
    phoneNumber: "ok",
    email: "faketest@email.com",
    dateOfContact: "whenever",
    id: 7,
};

beforeAll(() => {
    // test DB
    db.authenticate();
});
afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    await db.close();
});

describe("Test post track contacts route ", () => {
    it("connect to /getTrackContacts/", async () => {
        const url = `/contact-person/postTrackContacts/74`;
        const data = await request(app)
            .post(url)
            .send({ contacts: [fakePatient] })
            .expect(200)
            .then(response => response.body);
        expect(data).toEqual(true);
    });

    it("doesn't connect to /getTrackContacts/", async () => {
        const url = `/contact-person/postTrackContacts/74`;
        const data = await request(app)
            .post(url)
            .send({ dummy: "fake" })
            .expect(400)
            .then(response => response.body);
        expect(data).toEqual(false);
    });
});

describe("Test get all patients that have submitted a contact form ", () => {
    it("connect to /getTrackContacts/", async () => {
        const data = await request(app)
            .get(`/contact-person/getTrackContacts/`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => response.body);
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    firstName: expect.any(String),
                    lastName: expect.any(String),
                    number: expect.any(Number),
                }),
            ])
        );
    });
});

describe("Test get track contacts id route ", () => {
    it("connects to /getTrackContactsId/:AccountId with valid id", async () => {
        const url = `/contact-person/getTrackContactsId/7`;
        const data = await request(app)
            .get(url)
            .expect(200)
            .then(response => response.body);
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    phoneNumber: expect.any(String),
                    firstName: expect.any(String),
                    lastName: expect.any(String),
                    email: expect.any(String),
                    dateOfContact: expect.any(String),
                }),
            ])
        );
    });
    it("connects to /getTrackContactsId/:AccountId with invalid id", async () => {
        const url = `/contact-person/getTrackContactsId/fun`;
        const data = await request(app)
            .get(url)
            .expect(400)
            .then(response => response.body);
        expect(data).toEqual([]);
    });
});

describe("Test delete track contacts route ", () => {
    it("delete a contact person in /deleteTrackContacts/:AccountId with valid id", async () => {
        const url = `/contact-person/deleteTrackContacts/`;
        const data = await request(app)
            .delete(url)
            .send(fakePatient)
            .expect(200)
            .then(response => response.body);
        expect(data).toEqual(true);
    });
    it("delete a contact person in /deleteTrackContacts/:AccountId with invalid id", async () => {
        const url = `/contact-person/deleteTrackContacts/`;
        const data = await request(app)
            .delete(url)
            .send({})
            .expect(400)
            .then(response => response.body);
        expect(data).toEqual(false);
    });
});

describe("Test email someone that has been in contact", () => {
    it("connect to /sendEmail/", async () => {
        const data = await request(app)
            .patch(`/contact-person/sendEmail/`)
            .expect("Content-Type", /json/)
            .expect(200)
            .send({ ...fakePatient, email: ADMIN_EMAIL_ACCOUNT })
            .then(response => response.body);
        expect(data).toEqual(true);
    });

    it("doesn't connect to /sendEmail/ when invalid fields are left", async () => {
        const data = await request(app)
            .patch(`/contact-person/sendEmail/`)
            .expect("Content-Type", /json/)
            .expect(400)
            .send({ ...fakePatient, email: "FAKE EMAIL" })
            .then(response => response.body);
        expect(data).toEqual(false);
    });
});
