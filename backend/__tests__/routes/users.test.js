const request = require("supertest");
const app = require("../../index");
const db = require("../../config/database");
const User = require("../../models/user");

//Declare a test user as a patient
var testUserPatient = {
    firstName: "Test",
    lastName: "User",
    gender: "Male",
    dateOfBirth: "2022-01-26",
    address: "Test Address",
    city: "Test City",
    phoneNumber: "5144567890",
    email: "emailUsedForTest@email.com",
    password: "testing123!",
    postalCode: "1h34k5",
    accountRole: "Patient",
};

//Declare a test user as a doctor
var testUserDoctor = {
    firstName: "Test",
    lastName: "User",
    gender: "Male",
    dateOfBirth: "2022-01-26",
    address: "Test Address",
    city: "Test City",
    phoneNumber: "5144567890",
    email: "emailUsedForTestDoctor@email.com",
    password: "testing123!",
    postalCode: "1h34k5",
    accountRole: "Doctor",
};

beforeAll(async () => {
    //test DB
    await db.authenticate();
});

afterAll(async () => {
    //Remove testUserPatient and testUserDoctor from DB
    await User.destroy({
        where: {
            Email: [testUserPatient.email, testUserDoctor.email],
        },
    });
    // Closing the DB connection allows Jest to exit successfully.
    db.close();
});

describe("POST: Authentication of a user (Register and Login)", () => {
    it("User has been registered as a Patient", () => {
        return request(app)
            .post("/users/register")
            .send(testUserPatient)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        AccountId: expect.any(Number),
                        FirstName: expect.any(String),
                        LastName: expect.any(String),
                        Gender: expect.any(String),
                        DateOfBirth: expect.any(String),
                        Address: expect.any(String),
                        City: expect.any(String),
                        PhoneNumber: expect.any(String),
                        Email: expect.any(String),
                        PostalCode: expect.any(String),
                        Role: expect.any(String),
                        Confirmed: "true",
                    })
                );
            });
    });

    it("User has been registered as another role than Patient", () => {
        return request(app)
            .post("/users/register")
            .send(testUserDoctor)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        AccountId: expect.any(Number),
                        FirstName: expect.any(String),
                        LastName: expect.any(String),
                        Gender: expect.any(String),
                        DateOfBirth: expect.any(String),
                        Address: expect.any(String),
                        City: expect.any(String),
                        PhoneNumber: expect.any(String),
                        Email: expect.any(String),
                        PostalCode: expect.any(String),
                        Role: expect.any(String),
                        Confirmed: "false",
                    })
                );
            });
    });

    it("User registers with an email already in use", () => {
        return request(app).post("/users/register").send(testUserPatient).expect(400);
    });

    // it("User logs in successfully", () => {
    //     const testUserCredentials = {
    //         email: testUserPatient.email,
    //         password: testUserPatient.password,
    //     };
    //     return request(app).post("/users/login").send(testUserCredentials).expect(200);
    // });

    it("User attempts to log in with wrong email", () => {
        const testUserCredentials = {
            email: "wrongemail@wrongemail.com",
            password: testUserPatient.password,
        };
        return request(app).post("/users/login").send(testUserCredentials).expect(404);
    });

    it("User attempts to log in with wrong email", () => {
        const testUserCredentials = {
            email: testUserPatient.email,
            password: "wrongpassword123!",
        };
        return request(app).post("/users/login").send(testUserCredentials).expect(401);
    });
});
