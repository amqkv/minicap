const Status = require("../models/status");
const Sequelize = require("sequelize");
const op = Sequelize.Op;
const { QueryTypes } = require("sequelize");
const db = require("../config/database");
const Patient = require("../models/patient");
const moment = require("moment");

// Create new status
async function addStatus(req, res) {
    // for Kelvin
    // TODO: test cases
    // No status added [[TODAY]] yet -> Add status (code 200)
    // Status exists for today -> Update status (code 200)
    // Include failure cases for code 40X or 50X
    // NOTE: you might want to test if the patient has multiple status cards
    // --> Add 2 new status on 2 different days and check if the update is on the correct one
    try {
        const { PatientId } = await Patient.findOne({
            raw: true,
            where: { User_AccountId: req.body.accountId },
        });
        // splitting date format into year, month, day
        var year = req.body.statusTime.substring(0, 4);
        var month = req.body.statusTime.substring(5, 7);
        var day = req.body.statusTime.substring(8, 10);
        //@todo make it use sequelize functions soonTM
        const status = await db
            .query(
                `
                SELECT * FROM dbo.Status
                WHERE  (
                    DATEPART(yy, StatusTime) = ${year} 
                    AND    DATEPART(mm, StatusTime) = ${month}
                    AND    DATEPART(dd, StatusTime) = ${day}
                    AND Patient_PatientId = ${PatientId}
                )`,
                {
                    raw: true,
                    type: QueryTypes.SELECT,
                }
            )
            .then(status => {
                // status is the response from findOne() 
                // status has length 0 if there are no status card belonging to the patientID on the current day
                if (status.length > 0) {
                    Status.update(
                        {
                            Temperature: req.body.temperature,
                            StatusTime: req.body.statusTime,
                            IsReviewed: req.body.isReviewed ? "1" : "0",
                            Patient_PatientId: PatientId,
                            Weight: req.body.weight,
                            Symptoms: req.body.symptoms,
                        },
                        {
                            where: {
                                StatusId: status[0].StatusId,
                            },
                        }
                    );
                    res.status(200).send("Status updated successfully.");
                } else {
                    //Create new status [No status created yet today]
                    Status.create({
                        Temperature: req.body.temperature,
                        StatusTime: req.body.statusTime,
                        IsReviewed: req.body.isReviewed ? "1" : "0",
                        Patient_PatientId: PatientId,
                        Weight: req.body.weight,
                        Symptoms: req.body.symptoms,
                    });
                    res.status(200).send("new Status added successfully !");
                }
            });
    } catch {
        res.status(400).send("Failed to create status");
    }
}

// get all previous status
async function getAllStatus(req, res) {
    try {
        const { PatientId } = await Patient.findOne({
            raw: true,
            where: { User_AccountId: req.params.userId },
        });
        const allStatus = await Status.findAll({
            where: {
                Patient_PatientId: PatientId,
            },
            order: [["StatusTime", "DESC"]],
        });
        res.status(200).json(allStatus);
    } catch {
        res.status(400).send("Failed to get all status");
    }
}


module.exports = {
    addStatus,
    getAllStatus,
};