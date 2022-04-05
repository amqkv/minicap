const { QueryTypes } = require("sequelize");
const Moment = require("moment");
const RequiredDetails = require("../models/required-details");
const Patient = require("../models/patient");
const db = require("../config/database");
const Appointment = require("../models/appointment");

async function getRequiredDetails(req, res) {
    await Patient.findOne({
        raw: true,
        where: { User_AccountId: req.params.accountId },
    })
        .then(async result => {
            await RequiredDetails.findAll({
                raw: true,
                where: {
                    Patient_PatientId: result.PatientId,
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
                    res.status(400).send("ERROR: Could not find details");
                });
        })
        .catch(() => {
            res.status(400).send("ERROR: Cannot find patient");
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
        .then(() => {
            res.status(200).send("Appointment status updated.");
        })
        .catch(err => {
            res.status(500).send(`Error: ${err}`);
        });
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

    // find appointments in the future
    const incomingAppointments = [];
    patientAppointment.map(appointment => {
        const date = appointment.Date;
        if (Moment(today).isBefore(date)) {
            incomingAppointments.push(appointment);
        }
    });

    res.status(200).json(incomingAppointments);
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
    // updateRequiredDetails,
    getName,
    isPositive,
    getAppointmentForPatients,
    appointmentConfirmation,
    getConfirmedAppointments,
    getAssignedDoctor,
};
