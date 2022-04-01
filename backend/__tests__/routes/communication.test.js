const request = require("supertest");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const app = require("../../index");
const { TEST_CONSTANTS } = require("../../utils/constants");
const db = require("../../config/database");
const { communication } = require("../../routes/communication");
const Communication = require("../../models/communication");

beforeAll(async () => {
    // test DB
    await db.authenticate();
});
afterAll(async () => {
    // Delete messages created during test
    await Communication.destroy({
        where: {
            Content: "shishkebab",
        },
    });
    // Closing the DB connection allows Jest to exit successfully.
    await db.close();
});

describe("GET: fetch past messages", () => {
    it("Returns code 200 if messages are successfully retrieved", async () => {
        await request(app).get(`/communication/getMessage/${TEST_CONSTANTS.PATIENT_ACCOUNT.AccountId}`).expect(200);
    });

    it("Returns code 400 if invalid data is send", async () => {
        await request(app).get(`/communication/getMessage/abcde`).expect(400);
    });
});

describe("Web socket connection and functionalities", () => {
    let io;
    let clientSocket;

    beforeEach(done => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const { port } = httpServer.address();
            clientSocket = Client(`http://localhost:${port}`);
            communication(io);
            done();
        });
    });

    afterEach(async () => {
        io.close();
        clientSocket.close();
    });

    it("join room", done => {
        io.on("connection", socket => {
            socket.on("join_room", arg => {
                expect(arg).toBe(TEST_CONSTANTS.PATIENT_ACCOUNT.AccountId);
                done();
            });
            clientSocket.emit("join_room", TEST_CONSTANTS.PATIENT_ACCOUNT.AccountId);
        });
    });

    it("send message", async () => {
        const messageData = {
            Content: "shishkebab",
            Doctor_AccountId: 109,
            Patient_AccountId: 51,
            Author_AccountId: 51,
        };
        await io.on("connection", socket => {
            socket.on("send_message", arg => {
                expect(arg).toEqual(messageData);
                // done();
            });
            clientSocket.emit("send_message", messageData);
        });
    });
});
