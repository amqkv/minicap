const Status = require("../models/status");
const Patient = require("../models/patient");

// Create new status
async function addStatus(req, res) {
    try {
        const { PatientId } = await Patient.findOne({
            raw: true,
            where: { User_AccountId: req.body.accountId },
        });
        const dataa = await Status.create({
            Temperature: req.body.temperature,
            StatusTime: req.body.statusTime,
            IsReviewed: req.body.isReviewed ? "1" : "0",
            Patient_PatientId: PatientId,
            Weight: req.body.weight,
            Symptoms: req.body.symptoms,
        });
        res.status(200).json(dataa);
    } catch {
        res.status(400).send("Failed to create status");
    }
}

// get all previous status
function getAllStatus(req, res) {
    const allStatus = Status.findAll({
        where: {
            Patient_PatientId: req.params.patientId,
        },
    }).then(status => {
        res.json(status);
    });
    // res.json(allStatus);
}

// function to update today's status
function updateStatus(req, res) {
    Status.update({});
}

module.exports = {
    addStatus,
    getAllStatus,
};
