const { QueryTypes } = require("sequelize");
const Moment = require("moment");
const RequiredDetails = require("../models/required-details");
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
    await db
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
              S.Temperature, 
              S.Symptoms,
              S.Weight,
              S.StatusTime, 
              S.IsReviewed,
              RD.WeightRequired,
              RD.TemperatureRequired,
              RD.SymptomsRequired
    FROM Patient P, Users U, Status S, RequiredDetails RD
    WHERE P.Doctor_DoctorId=${req.params.doctorId} AND
          P.User_AccountId=U.AccountId AND
          P.PatientId=S.Patient_PatientId AND
          P.PatientId=RD.Patient_PatientId
    `,
            {
                type: QueryTypes.SELECT,
            }
        )
        .then(patients => {
            const patientsList = [];
            patients.map(patient => {
                patientsList.push({
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
                    status: {
                        weight: { value: patient.Weight, unit: "lbs" },
                        temperature: { value: patient.Temperature, unit: "°C" },
                        symptoms: { value: patient.Symptoms ? patient.Symptoms : "", unit: "" },
                        lastUpdated: Moment().diff(patient.StatusTime, "hours", true),
                    },
                    isReviewed: patient.IsReviewed,
                    isPrioritized: patient.IsPrioritized,
                });
            });

            res.json(patientsList);
        });
}

module.exports = {
    getRequiredDetails,
    updateRequiredDetails,
    getPatientsInfo,
};
