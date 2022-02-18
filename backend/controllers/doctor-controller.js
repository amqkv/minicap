const { QueryTypes, Sequelize } = require("sequelize");
const Moment = require("moment");
const RequiredDetails = require("../models/required-details");
const Status = require("../models/status");
const db = require("../config/database");

function getRequiredDetails(req, res) {
    RequiredDetails.findAll({
        raw: true,
        where: {
            Patient_PatientId: req.params.patientId,
        },
    })
        .then(requiredDetails => {
            // Renaming the detail names
            const temp = [];
            const keys = Object.keys(requiredDetails[0]);
            for (let i = 1; i < keys.length; i++) {
                if (keys[i].includes("Required")) {
                    temp.push({
                        [keys[i].replace("Required", "")]: requiredDetails[0][keys[i]],
                    });
                }
            }
            res.json(temp);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send("Could not find details");
        });
}

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
        .then(res.status(200).json({ message: "Successfully updated details." }))
        .catch(err => {
            console.log(err);
            res.status(400).json({ message: "Could not update details." });
        });
}

async function getPatientsInfo(req, res) {
    // Getting all statuses
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
    FROM Patient P, Users U, Status S, RequiredDetails RD, Doctor D
    WHERE D.User_AccountId=${req.params.userId} AND
        P.Doctor_DoctorId= D.DoctorId AND
          P.User_AccountId=U.AccountId AND
          P.PatientId=S.Patient_PatientId AND
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
                        ? Moment().diff(status.statusTime, "hours", true)
                        : 0,
                    isReviewed: status.isReviewed,
                });
            }
        });
        patientsList.push({ ...patient, status: currentPatientStatus });
        currentPatientStatus = [];
    });
    res.json(patientsList);
}

module.exports = {
    getRequiredDetails,
    updateRequiredDetails,
    getPatientsInfo,
};
