const RequiredDetails = require("../models/required-details");
const Patient = require("../models/patient");
const db = require("../config/database");
const { QueryTypes } = require("sequelize");
const Appointment = require("../models/appointment");
const Moment = require("moment");

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

// return all pending appointment for a certain patient
async function getAppointmentForPatients(req, res) {
    const { PatientId } = await Patient.findOne({
        raw: true,
        where: { User_AccountId: req.params.accountId },
    });
    const patientAppointment = await db.query(
        ` SELECT *
        FROM Appointment A
        WHERE A.Patient_PatientId = ${PatientId} AND 
        A.Status = 'pending'`,
        { type: QueryTypes.SELECT }
    );
    res.status(200).json(patientAppointment);
}

// update appointment status for the patient
async function appointmentConfirmation(req, res) {
    Appointment.update({ Status: req.body.confirm }, { where: { AppointmentId: req.body.appointmentId } })
        .then(success => {
            res.json("Appointment status updated");
        })
        .catch(err => console.log(err));
}

// function to get incomming appointments
async function getConfirmedAppointments(req, res) {
    const { PatientId } = await Patient.findOne({
        raw: true,
        where: { User_AccountId: req.params.accountId },
    });
    const patientAppointment = await db.query(
        ` SELECT *
        FROM Appointment A
        WHERE A.Patient_PatientId = ${PatientId} AND 
        A.Status = 'confirmed'
        ORDER BY Date ASC`,
        { type: QueryTypes.SELECT }
    );
    const today = Moment().format("YYYY-MM-DD");

    let incomingAppointments = [];
    patientAppointment.map(appointment => {
        let date = appointment.Date;
        if (Moment(today).isBefore(date)) {
            incomingAppointments.push(appointment);
        }
    });

    res.status(200).json(incomingAppointments);
}

module.exports = {
    getRequiredDetails,
    isPositive,
    getAppointmentForPatients,
    appointmentConfirmation,
    getConfirmedAppointments,
};
