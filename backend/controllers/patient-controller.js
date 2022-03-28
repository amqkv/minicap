const { QueryTypes } = require("sequelize");
const RequiredDetails = require("../models/required-details");
const Patient = require("../models/patient");
const db = require("../config/database");

async function getRequiredDetails(req, res) {
    const { PatientId } = await Patient.findOne({
        raw: true,
        where: { User_AccountId: req.params.accountId },
    });

    RequiredDetails.findAll({
        raw: true,
        where: {
            Patient_PatientId: PatientId,
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

// function updateRequiredDetails(req, res) {
//     RequiredDetails.update(
//         {
//             WeightRequired: req.body[0].Weight,
//             TemperatureRequired: req.body[1].Temperature,
//             SymptomsRequired: req.body[2].Symptoms,
//         },
//         {
//             where: { Patient_PatientId: req.params.patientId },
//         }
//     )
//         .then(res.status(200).json({ message: "Details have been updated successfully" }))
//         .catch(() => res.status(400).json({ message: "Could not update details." }));
// }

async function isPositive(req, res) {
    try {
        const { HasCovid } = await Patient.findOne({
            raw: true,
            where: { User_AccountId: req.params.accountId },
        });
        res.status(200).json(HasCovid);
    } catch {
        res.status(400).json(false);
    }
}

// Get doctor associated to patient
async function getAssignedDoctor(req, res) {
    await db
        .query(
            `SELECT U.AccountId, U.FirstName, U.LastName 
            FROM Doctor D, Patient P, Users U
            WHERE P.User_AccountId='${req.params.accountId}' AND 
            D.DoctorId = P.Doctor_DoctorId AND D.User_AccountId = U.AccountId`,
            {
                type: QueryTypes.SELECT,
            }
        )
        .then(doctor => {
            if (doctor.length === 0) {
                return res.status(400).send("No doctor assigned. Failed to execute.");
            }
            return res.status(200).send(doctor[0]);
        })
        .catch(err => {
            console.log("Error: ", err);
            res.status(400).send("Error fetching doctor assigned to patient");
        });
}

module.exports = {
    getRequiredDetails,
    //updateRequiredDetails,
    isPositive,
    getAssignedDoctor,
};
