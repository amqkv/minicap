const request = require("supertest");
const app = require("../../index");
const db = require("../../config/database");
const User = require("../../models/user");

// Declare a test user as a patient
const testUserPatient = {
    firstName: "Test",
    lastName: "User",
    gender: "Male",
    dateOfBirth: "2022-01-26",
    address: "Test Address",
    city: "Test City",
    phoneNumber: "5144567890",
    email: "emailusedfortest@email.com",
    password: "testing123!",
    postalCode: "1h34k5",
    accountRole: "Patient",
};

// Declare a test user as a doctor
const testUserDoctor = {
    firstName: "Test",
    lastName: "User",
    gender: "Male",
    dateOfBirth: "2022-01-26",
    address: "Test Address",
    city: "Test City",
    phoneNumber: "5144567890",
    email: "emailfortestdoctor@email.com",
    password: "testing123!",
    postalCode: "1h34k5",
    accountRole: "Doctor",
};

beforeAll(async () => {
    // Mock env file
    jest.resetModules();
    process.env.ACCESS_TOKEN_SECRET = "test";
    await db.authenticate();
});

afterAll(async () => {
    // Remove testUserPatient and testUserDoctor from DB
    await User.destroy({
        where: {
            Email: [testUserPatient.email, testUserDoctor.email],
        },
    });
    // Closing the DB connection allows Jest to exit successfully.
    delete process.env.ACCESS_TOKEN_SECRET;
    await db.close();
});

describe("POST: Register a user", () => {
    it("User has been registered as a Patient", async () => {
        await request(app)
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
                        ConfirmedFlag: 1,
                        RejectedFlag: 0,
                    })
                );
            });
    });

    it("User has been registered as another role than Patient", async () => {
        await request(app)
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
                        ConfirmedFlag: 0,
                        RejectedFlag: 0,
                    })
                );
            });
    });

    it("User registers with an email already in use", () =>
        request(app).post("/users/register").send(testUserPatient).expect(400));
});

describe("POST: Login of a user", () => {
    it("User logs in successfully", () => {
        const testUserCredentials = {
            email: testUserPatient.email,
            password: testUserPatient.password,
        };
        return request(app).post("/users/login").send(testUserCredentials).expect(200);
    });

    it("User attempts to log in with wrong email", () => {
        const testUserCredentials = {
            email: "wrongemail@wrongemail.com",
            password: testUserPatient.password,
        };
        return request(app).post("/users/login").send(testUserCredentials).expect(404);
    });

    it("User attempts to log in with wrong password", () => {
        const testUserCredentials = {
            email: testUserPatient.email,
            password: "wrongpassword123!",
        };
        return request(app).post("/users/login").send(testUserCredentials).expect(401);
    });

    it("User attempts to log in without an email", () => {
        const testUserCredentials = {
            password: "testing123!",
        };
        return request(app).post("/users/login").send(testUserCredentials).expect(500);
    });
});

describe("Get: Get users with their respective role", () => {
    it("Retrieve the data successfully", async () => {
        const data = await request(app)
            .get("/users/role")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => response.body);
        expect(data).toEqual(
            expect.objectContaining({
                Patient: expect.arrayContaining([
                    expect.objectContaining({
                        AccountId: expect.any(Number),
                        FirstName: expect.any(String),
                        LastName: expect.any(String),
                        Role: expect.any(String),
                    }),
                ]),
            })
        );
    });
});

describe("GET: pending users list", () => {
    it("Get the list of unconfirmed users successfully.", async () => {
        const data = await request(app)
            .get("/users/pending")
            .expect("Content-type", /json/)
            .expect(200)
            .then(response => response.body);
        expect(data).toEqual(
            expect.objectContaining({
                Users: expect.arrayContaining([
                    expect.objectContaining({
                        AccountId: expect.any(Number),
                        FirstName: expect.any(String),
                        LastName: expect.any(String),
                        Role: expect.any(String),
                        ConfirmedFlag: expect.any(Boolean),
                    }),
                ]),
            })
        );
    });
});

describe("Test homepage route ", () => {
    it("connect to /", () => request(app).get("/").send().expect(200));
});
