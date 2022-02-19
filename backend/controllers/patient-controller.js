const RequiredDetails = require("../models/required-details");
const Patient = require("../models/patient");

function getRequiredDetails(req, res) {
    RequiredDetails.findAll({
        raw: true,
        where: {
            Patient_PatientId: req.params.patientId,
        },
    })
        .then(requiredDetails => {
            console.log(requiredDetails);
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
            WeightRequired: req.body[0].Weight,
            TemperatureRequired: req.body[1].Temperature,
            SymptomsRequired: req.body[2].Symptoms,
        },
        {
            where: { Patient_PatientId: req.params.patientId },
        }
    )
        .then(res.status(200).json({ message: "Details have been updated successfully" }))
        .catch(() => res.status(400).json({ message: "Could not update details." }));
}

module.exports = {
    getRequiredDetails,
    updateRequiredDetails,
};
