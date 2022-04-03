const { QueryTypes } = require("sequelize");
const db = require("../config/database");
const RequiredDetails = require("../models/required-details");
const Patient = require("../models/patient");

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

async function getName(req, res) {
    try {
        const name = await db.query(
            `SELECT U.FirstName as firstName, U.LastName as lastName
            FROM Users U, Patient P
            WHERE U.AccountId = P.User_AccountId AND P.PatientId = ${req.params.id}`,
            {
                raw: true,
                type: QueryTypes.SELECT,
            }
        );
        if (name[0].firstName === "") throw new Error();
        res.status(200).json(name[0]);
    } catch {
        res.status(400).json(false);
    }
}

module.exports = {
    getRequiredDetails,
    // updateRequiredDetails,
    isPositive,
    getName,
};
