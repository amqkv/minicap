const request = require("supertest");
const app = require("../../index");
const db = require("../../config/database");
const Patient = require("../../models/patient");
const Appointment = require("../../models/appointment");
const { TEST_CONSTANTS, BOOLEANS, DOCTOR_TEST_SUBJECTS } = require("../../utils/constants");

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
            patientId: TEST_CONSTANTS.INVALID_ACCOUNT_ID,
        };
        return request(app).patch("/doctors/updateRequiredDetails").send(data).expect(400);
    });

    it("Returns code 200 if update has been successful", () => {
        const data = {
            weight: true,
            temperature: true,
            symptoms: true,
            patientId: DOCTOR_TEST_SUBJECTS.PATIENT_FOUR.Patient_Id,
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
        const userId = TEST_CONSTANTS.DOCTOR_ASSIGN_ADMIN_TEST.Patient_Id; // in the assign test of admin, Patient must be unassigned so it can be used here
        return request(app).get(`/doctors/getPatientsInfo/${userId}`).expect(400);
    });
    it("Returns code 200 and patient array if user is a doctor", async () => {
        const userId = DOCTOR_TEST_SUBJECTS.DOCTOR_INFO.AccountId;
        const response = await request(app).get(`/doctors/getPatientsInfo/${userId}`);
        expect(response.body).toHaveLength(5); // Test doctor has 4 PATIENTS + 1 COVID FLIP PATIENT
        await request(app).get(`/doctors/getPatientsInfo/${userId}`).expect(200);
    });
    it("Returns the patient object with correct symptoms and lastUpdated attributes if null", async () => {
        const userId = DOCTOR_TEST_SUBJECTS.DOCTOR_INFO.AccountId;
        const response = await request(app).get(`/doctors/getPatientsInfo/${userId}`);
        expect(response.body[1].status[0].symptoms.value).toEqual("test test");
        // Commented, having a status with no time/date causes error in frontend
        // expect(response.body[1].status[0].lastUpdated).toEqual(0);
    });
});

describe("GET: get list of patient's name of current doctor", () => {
    it("Returns code 200 and patient list of names if user is a doctor", async () => {
        const userId = TEST_CONSTANTS.DOCTOR_ACCOUNT.AccountId;
        await request(app).get(`/doctors/getPatientsName/${userId}`).expect(200);
    });
    it("Returns code 400 if user is not a doctor", async () => {
        const userId = 0;
        await request(app).get(`/doctors/getPatientsName/${userId}`).expect(400);
    });
});

describe("PATCH: update the priority of a patient as a doctor", () => {
    // Reset Mock user to original state
    afterAll(async () => {
        await Patient.update(
            {
                IsPrioritized: BOOLEANS.FALSE,
            },
            {
                where: {
                    User_AccountId: DOCTOR_TEST_SUBJECTS.PATIENT_ONE.AccountId,
                },
            }
        );
    });

    it("Returns 200: Priority is updated successfully by a doctor", async () => {
        const data = {
            accountId: DOCTOR_TEST_SUBJECTS.DOCTOR_INFO.AccountId, // accountId of Doctor
            patientId: DOCTOR_TEST_SUBJECTS.PATIENT_ONE.Patient_Id,
            isPrioritized: BOOLEANS.TRUE,
        };
        await request(app).patch("/doctors/updatePriority").send(data).expect(200);
    });

    it("Returns 400: Priority not updated due to non-existing patient", async () => {
        const data = {
            accountId: DOCTOR_TEST_SUBJECTS.DOCTOR_INFO.AccountId, // accountId of Doctor
            patientId: TEST_CONSTANTS.INVALID_ACCOUNT_ID,
            isPrioritized: BOOLEANS.TRUE,
        };
        await request(app).patch("/doctors/updatePriority").send(data).expect(400);
    });

    it("Returns 400: Priority not updated due to missing isPrioritized attribute", async () => {
        const data = {
            accountId: DOCTOR_TEST_SUBJECTS.DOCTOR_INFO.AccountId,
            patiendId: DOCTOR_TEST_SUBJECTS.PATIENT_ONE,
        };
        await request(app).patch("/doctors/updatePriority").send(data).expect(400);
    });

    it("Returns 500: Priority not updated due to missing patient attribute", async () => {
        const data = {
            accountId: DOCTOR_TEST_SUBJECTS.DOCTOR_INFO.AccountId,
            isPrioritized: BOOLEANS.TRUE,
        };
        await request(app).patch("/doctors/updatePriority").send(data).expect(500);
    });

    it("Returns 401: Priority not updated due to user not being a Doctor", async () => {
        const data = {
            accountId: DOCTOR_TEST_SUBJECTS.PATIENT_TWO.AccountId,
            patiendId: DOCTOR_TEST_SUBJECTS.PATIENT_ONE.Patiend_Id,
            isPrioritized: BOOLEANS.TRUE,
        };
        await request(app).patch("/doctors/updatePriority").send(data).expect(401);
    });
});

describe("Doctor's Patient Dashboard Info", () => {
    it("Loads the data to be presented in the dashboard", async () => {
        const userId = DOCTOR_TEST_SUBJECTS.DOCTOR_INFO.AccountId;
        await request(app)
            .get(`/doctors/getPatientsDashboardInfo/${userId}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        allPatientCnt: expect.any(Number),
                        highTempPatientCnt: expect.any(Number),
                    })
                );
            });
    });
});
describe("POST: makeAppointment - Adding a new appointment", () => {
    it("Returns code 200 if appointment has been created successfully", async () => {
        const testAppointment = {
            patientId: TEST_CONSTANTS.APPOINTMENT_PATIENT_ACCOUNT.PatientId,
            date: "2022-03-03",
            time: "9:00 - 9:30",
        };
        await request(app).post("/doctors/makeAppointment/109").send(testAppointment).expect(200);
        await Appointment.destroy({ where: { Patient_PatientId: testAppointment.patientId } });
    });

    it("Returns code 404 if user does not exist", async () => {
        const testAppointment = {
            patientId: 23617826387126,
            date: "2022-03-03",
            time: "9:00 - 9:30",
        };
        await request(app).post("/doctors/makeAppointment/109").send(testAppointment).expect(404);
    });
});

describe("GET: getAppointmentsAndPatients", () => {
    it("Returns code 200 and object of appointments & patients if user is a doctor", async () => {
        await request(app)
            .get(`/doctors/getAppointmentsAndPatients/${TEST_CONSTANTS.DOCTOR_ACCOUNT.AccountId}`)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        appointmentList: expect.any(Array),
                        patientList: expect.any(Array),
                    })
                );
            });
    });
});

describe("Doctor Review Patient", () => {
    it("Mark the patient status as reviewed", async () => {
        const data = {
            patientId: DOCTOR_TEST_SUBJECTS.PATIENT_THREE.Patient_Id,
        };
        await request(app).patch("/doctors/reviewPatient").send(data).expect(200);
    });
    it("Fails to Mark the patient status as reviewed as the patient does not exists", async () => {
        const data = {
            patientId: TEST_CONSTANTS.INVALID_ACCOUNT_ID,
        };
        await request(app).patch("/doctors/reviewPatient").send(data).expect(400);
    });
    it("Fails to Mark the patient status as reviewed since no data is sent", async () => {
        await request(app).patch("/doctors/reviewPatient").expect(500);
    });
});
