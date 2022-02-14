const RequiredDetails = require("../models/required-details");
const Patient = require("../models/patient");
const User = require("../models/user");
const Status = require("../models/status");
const db = require("../config/database");

const { QueryTypes, Sequelize } = require("sequelize");
const Moment = require("moment");

function getRequiredDetails(req, res) {
    RequiredDetails.findAll({
        raw: true,
        where: {
            Patient_PatientId: req.params.patientId,
        },
    })
        .then(requiredDetails => {
            // Renaming the detail names
            console.log(requiredDetails);
            let temp = [];
            let keys = Object.keys(requiredDetails[0]);
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
            WeightRequired: req.body[0].Weight,
            TemperatureRequired: req.body[1].Temperature,
            SymptomsRequired: req.body[2].Symptoms,
        },
        {
            where: { Patient_PatientId: req.params.patientId },
        }
    )
        .then(res.status(200).json({ message: "Details have been updated successfully" }))
        .catch(err => res.status(400).json({ message: "Could not update details." }));
}

async function getPatientsInfo(req, res) {
    console.log("getpatientsinfo");
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
            let patientsList = [];
            patients.map(patient => {
                console.log(patient);
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
                        symptoms: { value: patient.Symptoms | "", unit: "" },
                        lastUpdated: Moment().diff(patient.StatusTime, "hours"),
                    },
                    isReviewed: patient.IsReviewed,
                    isPrioritized: patient.IsPrioritized,
                });
            });

            console.log(patientsList);

            res.json(patientsList);
        });

    // Query with sequelize gives error - fokin aids
    // Patient.findAll({
    //   // <TODO> Get current doctor's ID
    //   where: { Doctor_DoctorID: req.params.doctorId },
    //   raw: true,
    //   attributes: [
    //     [Sequelize.col('Patient.PatientId'), 'patientId'],
    //     [Sequelize.col('Patient.Height'), 'height'],
    //     [Sequelize.col('Patient.Weight'), 'weight'],
    //     [Sequelize.col('Patient.IsPrioritized'), 'isPrioritized'],
    //     [Sequelize.col('Patient.LastUpdatedDate'), 'lastUpdatedDate'],
    //     [Sequelize.col('Patient.Doctor_DoctorID'), 'doctorID'],
    //     [Sequelize.col('Patient.User_AccountId'), 'accountId'],
    //     [Sequelize.col('User.FirstName'), 'firstName'],
    //     [Sequelize.col('User.LastName'), 'lastName'],
    //     [Sequelize.col('User.Gender'), 'gender'],
    //     [Sequelize.col('User.DateOfBirth'), 'dob'],
    //     [Sequelize.col('Status.Temperature'), 'temperature'],
    //     [Sequelize.col('Status.StatusTime'), 'statusTime'],
    //     [Sequelize.col('Status.IsReviewed'), 'isReviewed'],
    //   ],
    //   include: [
    //     { model: User, attributes: [] },
    //     { model: Status, attributes: [] },
    //   ],
    // })
    //   .then((patients) => {
    //     patients.forEach((patient) => {
    //       patient.age = Moment().diff(patients[0].dob, 'years');
    //     });
    //     console.log(patients);
    //     res.json(patients);
    //   })
    //   .catch((err) => console.log(err));
}

module.exports = {
    getRequiredDetails,
    updateRequiredDetails,
    getPatientsInfo,
};
