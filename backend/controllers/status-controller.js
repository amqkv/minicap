const Status = require("../models/status");

// Create new status
function addStatus(req, res) {
    Status.create({
        Temperature: req.body.temperature,
        StatusTime: req.body.statusTime,
        IsReviewed: req.body.isReviewed,
        Patient_PatientId: req.body.patientId,
        Weight: req.body.weight,
        Symptoms: req.body.symptoms,
    })
        .then(status => {
            //res.status(200).send("Created Successfully");
            res.status(200).send(status);
            console.log(status);
        })
        .catch(err => {
            console.log("Error: ", err);
            res.status(400).send("Failed to create status");
        });
}

// get all previous status
function getAllStatus(req, res) {
    const allStatus = Status.findAll({
        where: {
            Patient_PatientId: req.params.patientId,
        },
    }).then(status => {
        res.json(status);
    })
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
