const RequiredDetails = require("../models/required-details");
const Patient = require("../models/patient");
const db = require("../config/database");
const { QueryTypes } = require("sequelize");
const Appointment = require("../models/appointment");

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

async function getAppointmentForPatients(req, res) {
    const { PatientId } = await Patient.findOne({
        raw: true,
        where: { User_AccountId: req.params.accountId },
    });
    console.log(PatientId);

    const patientAppointment = await db.query(
        ` SELECT *
        FROM Appointment A
        WHERE A.Patient_PatientId = ${PatientId} AND 
        A.Status = 'pending'`,
        { type: QueryTypes.SELECT }
    );
    res.status(200).json(patientAppointment);
}

async function appointmentConfirmation(req, res) {
    Appointment.update({ Status: req.body.confirm }, 
        { where: { AppointmentId: req.body.appointmentId } })
        .then(success => {
            res.json("good job");
        })
        .catch(err => console.log(err));
}

module.exports = {
    getRequiredDetails,
    isPositive,
    getAppointmentForPatients,
    appointmentConfirmation,
};
