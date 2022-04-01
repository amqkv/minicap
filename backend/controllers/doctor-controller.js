const { QueryTypes, Sequelize } = require("sequelize");
const Moment = require("moment");
const RequiredDetails = require("../models/required-details");
const Status = require("../models/status");
const db = require("../config/database");
const Patient = require("../models/patient");
const constants = require("../utils/constants");
const emailSender = require("../utils/email-sender");

// Update form details required for patients to complete
function updateRequiredDetails(req, res) {
    RequiredDetails.update(
        {
            WeightRequired: req.body.weight ? "1" : "0",
            TemperatureRequired: req.body.temperature ? "1" : "0",
            SymptomsRequired: req.body.symptoms ? "1" : "0",
        },
        {
            where: { Patient_PatientId: req.body.patientId },
        }
    )
        .then(detail => {
            if (detail[0]) {
                res.status(200).send("Successfully updated details.");
            } else {
                res.status(400).send("Failed to execute the assignment.");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(`Error: ${err}`);
        });
}

// Get all status in most recent order
async function getAllStatus() {
    const allStatus = await Status.findAll({
        raw: true,
        attributes: [
            [Sequelize.col("Status.StatusId"), "statusId"],
            [Sequelize.col("Status.Weight"), "weight"],
            [Sequelize.col("Status.Patient_PatientId"), "patientId"],
            [Sequelize.col("Status.Temperature"), "temperature"],
            [Sequelize.col("Status.Symptoms"), "symptoms"],
            [Sequelize.col("Status.IsReviewed"), "isReviewed"],
            [Sequelize.col("Status.StatusTime"), "statusTime"],
        ],
        order: [Sequelize.literal("StatusTime DESC")],
    }).catch(err => console.log(err));
    return allStatus;
}

// Get patient information of the current doctor
async function getPatientsInfo(req, res) {
    // Getting all statuses
    const allStatus = await getAllStatus();

    // Getting the current doctor's patients
    const patients = await db
        .query(
            `SELECT P.PatientId, 
              P.Height,
              P.IsPrioritized, 
              P.LastUpdatedDate, 
              P.Doctor_DoctorID, 
              U.FirstName, 
              U.LastName,
              U.Gender, 
              U.DateOfBirth, 
              RD.WeightRequired,
              RD.TemperatureRequired,
              RD.SymptomsRequired
    FROM Patient P, Users U, RequiredDetails RD, Doctor D
    WHERE D.User_AccountId=${req.params.userId} AND
          P.Doctor_DoctorId= D.DoctorId AND
          P.User_AccountId=U.AccountId AND
          P.PatientId=RD.Patient_PatientId
    `,
            {
                type: QueryTypes.SELECT,
            }
        )
        .then(patientsList => {
            const formattedPatientsList = [];
            // Formatting the Patient object shape
            patientsList.map(patient => {
                formattedPatientsList.push({
                    patientId: patient.PatientId,
                    doctorId: patient.Doctor_DoctorID,
                    basicInformation: {
                        firstName: patient.FirstName,
                        lastName: patient.LastName,
                        gender: patient.Gender,
                        height: patient.Height,
                        dob: patient.DateOfBirth,
                        age: Moment().diff(patient.DateOfBirth, "years"),
                    },
                    requiredDetails: {
                        weight: patient.WeightRequired,
                        temperature: patient.TemperatureRequired,
                        symptoms: patient.SymptomsRequired,
                    },
                    isPrioritized: patient.IsPrioritized,
                });
            });
            return formattedPatientsList;
        })
        .catch(err => console.log(err));

    if (patients.length === 0) {
        res.status(400).send("User is not a doctor. Failed to execute the assignment.");
    } else {
        // Adding the status history to all patients
        let currentPatientStatus = [];
        const patientsList = [];
        patients.map(patient => {
            allStatus.map(status => {
                if (status.patientId === patient.patientId) {
                    currentPatientStatus.push({
                        statusId: status.statusId,
                        weight: { value: status.weight, unit: "lbs" },
                        temperature: { value: status.temperature, unit: "°C" },
                        symptoms: { value: status.symptoms ? status.symptoms : "", unit: "" },
                        lastUpdatedDate: new Date(status.statusTime).toLocaleDateString(),
                        lastUpdated: Moment().diff(status.statusTime, "hours", true)
                            ? Moment().diff(status.statusTime, "hours", true) - constants.MOMENT_TIMEZONE_ADJUSTMENT
                            : 0,
                        isReviewed: status.isReviewed,
                        statusTime: status.statusTime,
                    });
                }
            });
            let isAllReviewed = true;
            currentPatientStatus.some(status => {
                if (status.isReviewed === false) {
                    isAllReviewed = false;
                    return true;
                }
            });

            patientsList.push({ ...patient, status: currentPatientStatus, isAllReviewed });
            currentPatientStatus = [];
        });
        res.json(patientsList);
    }
}

async function getPatientsDashboardInfo(req, res) {
    await db
        .query(
            `SELECT allPatients.cnt as allPatientCnt, todayStatus.highTempCnt as highTempPatientCnt
                FROM (SELECT COUNT(*) as cnt
                        FROM Patient P, Doctor D
                        WHERE D.User_AccountId=${req.params.userId} AND
                            P.Doctor_DoctorId=D.DoctorId) AS allPatients,
                    (SELECT COUNT(*) AS highTempCnt
                        FROM Status S, Patient P, Doctor D
                        WHERE DATEPART(yy, S.StatusTime) = ${Moment().format("YYYY")} AND
                            DATEPART(mm, S.StatusTime) = ${Moment().format("MM")} AND
                            DATEPART(dd, S.StatusTime) = ${Moment().format("DD")} AND
                            S.Temperature >= 38 AND
                            P.PatientId = S.Patient_PatientId AND
                            D.User_AccountId = ${req.params.userId}) AS todayStatus`,
            {
                type: QueryTypes.SELECT,
            }
        )
        .then(patientDashboardInfo => {
            res.json(patientDashboardInfo[0]);
        });
}

// Update the priority state of a patient
async function updatePriority(req, res) {
    await Patient.update(
        {
            IsPrioritized: req.body.isPrioritized,
        },
        {
            where: {
                PatientId: req.body.patientId,
            },
        }
    )
        .then(patient => {
            if (patient[0]) {
                res.status(200).send("Priority of patient has been successfully updated !");
            } else {
                res.status(400).send("Failed to execute priority update.");
            }
        })
        .catch(err => {
            console.log("[Update Priority] Error: ", err);
            res.status(500).send("Failed to execute priority update.");
        });
}

// Update the priority state of a patient
async function reviewPatient(req, res) {
    await db
        .query(
            `UPDATE Status
            SET IsReviewed=1
            WHERE StatusId=(SELECT TOP(1) StatusId 
                            FROM Status
                            WHERE Patient_PatientId=${req.body.patientId}
                            ORDER BY StatusTime DESC)`,
            {
                type: QueryTypes.UPDATE,
            }
        )
        .then(status => {
            if (status[0]) {
                res.status(200).send("Task completed successfully!");
            } else {
                res.status(400).send("Failed to execute update.");
            }
        })
        .catch(err => {
            console.log("[Update Priority] Error: ", err);
            res.status(500).send("Failed to execute priority update.");
        });
}
async function sendAppointmentEmail(req, res) {
    await db
        .query(
            `SELECT patient.p_email, patient.p_firstName, patient.p_lastName, doctor.d_firstName, doctor.d_lastName
                FROM (SELECT U.Email AS p_email, U.FirstName AS p_firstName, U.LastName AS p_lastName
                        FROM Users U, Patient P
                        WHERE P.PatientId=${req.body.patientId} AND 
                            P.User_AccountId=U.AccountId) AS patient, 
                    (SELECT FirstName AS d_firstName, LastName AS d_lastName
                        FROM Users
                        WHERE AccountId=${req.params.userId}) AS doctor`,
            {
                type: QueryTypes.SELECT,
            }
        )
        .then(userInfo => {
            const mailOptions = {
                from: constants.ADMIN_EMAIL_ACCOUNT,
                to: userInfo[0].p_email,
                subject: `New Appointment Scheduled`,
                html: `<p>Hello <b>${userInfo[0].p_firstName} ${userInfo[0].p_lastName}</b>,</p>
                 <p>You have a new scheduled appointment with Doctor <b>${userInfo[0].d_firstName} ${userInfo[0].d_lastName}</b>.</p>
                <p>Please head over your Appointments dashboard to view the details of your appointment and to confirm/decline.</p>`,
            };
            emailSender.emailTransporter.sendMail(mailOptions, error => {
                if (error) {
                    console.log("Email error: ", error);
                    res.status(400).send("Failed to send email");
                } else {
                    res.status(200).send("Email successfully sent!");
                }
            });
        });
}

async function makeAppointment(req, res) {
    await db
        .query(
            `INSERT INTO Appointment(Patient_PatientId, Doctor_DoctorId, Date, Time, Status)
                        SELECT ${req.body.patientId} , DoctorId, '${req.body.date}' , '${req.body.time}', 'pending'
                            FROM Doctor
                            WHERE User_AccountId=${req.params.userId}`,
            {
                type: QueryTypes.INSERT,
            }
        )
        .then(() => {
            sendAppointmentEmail(req, res);
            res.status(200).send("Appointment successfully made!");
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Could not create appointment.");
        });
}

async function getAppointmentsAndPatients(req, res) {
    const patientList = await db.query(
        `SELECT P.PatientId AS patientId, 
            P.Doctor_DoctorID AS doctorId, 
            U.FirstName AS firstName, 
            U.LastName AS lastName,
            U.Gender AS gender, 
            DATEDIFF(YEAR, U.DateOfBirth, GETDATE()) AS age
        FROM Patient P, Users U, Doctor D
        WHERE D.User_AccountId=${req.params.userId} AND
        P.Doctor_DoctorId= D.DoctorId AND
        P.User_AccountId=U.AccountId`,
        { type: QueryTypes.SELECT }
    );
    await db
        .query(
            `SELECT A.AppointmentId AS appointmentId, 
                    A.Patient_PatientId AS patientId, 
                    U.FirstName AS firstName,
                    U.LastName AS lastName,
                    DATEDIFF(YEAR, U.DateOfBirth, GETDATE()) AS age,
                    U.Gender AS gender,
                    A.Date AS date, 
                    A.Time AS time,
                    A.Status AS status
                        FROM Appointment A, Doctor D, Users U, Patient P
                        WHERE D.User_AccountId=${req.params.userId}
                            AND A.Doctor_DoctorId=D.DoctorId
                            AND U.AccountId=P.User_AccountId
                            AND P.PatientID=A.Patient_PatientID
                        ORDER BY 
                                    CASE WHEN A.Date >= getdate() THEN A.Date + A.Time END ASC,
                                    CASE WHEN A.Date < getdate() THEN A.Date + A.Time END DESC`,
            { type: QueryTypes.SELECT }
        )
        .then(appointmentList => {
            res.json({ appointmentList, patientList });
        })
        .catch(err => console.log(err));
}

module.exports = {
    updateRequiredDetails,
    getPatientsInfo,
    getPatientsDashboardInfo,
    updatePriority,
    reviewPatient,
    makeAppointment,
    getAppointmentsAndPatients,
    sendAppointmentEmail,
};
