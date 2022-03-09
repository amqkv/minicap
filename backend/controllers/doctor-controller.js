const { QueryTypes, Sequelize } = require("sequelize");
const Moment = require("moment");
const RequiredDetails = require("../models/required-details");
const Status = require("../models/status");
const db = require("../config/database");
const Patient = require("../models/patient");
const constants = require("../utils/constants");

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
                        weight: { value: status.weight, unit: "lbs" },
                        temperature: { value: status.temperature, unit: "°C" },
                        symptoms: { value: status.symptoms ? status.symptoms : "", unit: "" },
                        lastUpdated: Moment().diff(status.statusTime, "hours", true)
                            ? Moment().diff(status.statusTime, "hours", true) - constants.MOMENT_TIMEZONE_ADJUSTMENT
                            : 0,
                        isReviewed: status.isReviewed,
                        statusTime: status.statusTime,
                    });
                }
            });
            patientsList.push({ ...patient, status: currentPatientStatus });
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

module.exports = {
    updateRequiredDetails,
    getPatientsInfo,
    getPatientsDashboardInfo,
    updatePriority,
};
