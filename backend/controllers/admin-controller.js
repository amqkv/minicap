const { QueryTypes } = require("sequelize");
const User = require("../models/user");
const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const constants = require("../utils/constants");
const db = require("../config/database");
const emailSender = require("../utils/email-sender");

/**
 * Update role of user as admin
 * newRole: new role to assign to the user
 * oldRole: old role of the user
 * AccountId: AccountId of the user that the role will be modified
 */
async function updateRole(req, res) {
    if (req.body.newRole === req.body.oldRole) {
        await res.status(200).send("Same role");
    } else {
        const updated = await User.update(
            {
                Role: req.body.newRole,
            },
            {
                where: {
                    AccountId: req.body.userId,
                },
            }
        ).catch(err => {
            res.status(500).send(`Error:${err}`);
        });

        // Update successful
        if (updated[0]) {
            // Remove user from patient table if old role patient
            if (req.body.oldRole === constants.ROLE.PATIENT) {
                await Patient.destroy({
                    where: {
                        User_AccountId: req.body.userId,
                    },
                });
            }
            // Add user to patient table if new role patient
            if (req.body.newRole === constants.ROLE.PATIENT) {
                await Patient.create({
                    User_AccountId: req.body.userId,
                    IsPrioritized: constants.BOOLEANS.FALSE,
                    HasCovid: constants.BOOLEANS.FALSE,
                });
            }
            // Remove user from doctor table if old role doctor
            if (req.body.oldRole === constants.ROLE.DOCTOR) {
                await Doctor.destroy({
                    where: {
                        User_AccountId: req.body.userId,
                    },
                });
            }
            // Add user to doctor table if new role doctor
            if (req.body.newRole === constants.ROLE.DOCTOR) {
                await Doctor.create({
                    User_AccountId: req.body.userId,
                });
            }
            res.status(200).send("Role successfully updated !");
        } else {
            res.status(400).send("Failed to execute the role update");
        }
    }
}

/**
 * Get all patients of each doctors as admin
 */
async function getPatientsDoctors(req, res) {
    let response = {};

    const doctors = await db
        .query(
            `
            SELECT U.AccountId as accountId, U.FirstName as firstName, U.LastName as lastName, D.DoctorId as doctorId
    From Users U
    JOIN Doctor D on U.AccountId =  D.User_AccountId
    WHERE U.ROle = '${constants.ROLE.DOCTOR}' AND U.ConfirmedFlag = 1`,
            {
                raw: true,
                nest: true,
                type: QueryTypes.SELECT,
            }
        )
        .catch(err => {
            console.log("Error: ", err);
            res.status(500).send("Error in loading the Doctors");
        });
    const patients = await db
        .query(
            `
            Select U.AccountId as accountId, P.PatientId as patientId, U.FirstName as firstName, U.LastName as lastName, P.Doctor_DoctorId as doctorId
            From Users U
            JOIN Patient P on U.AccountId = P.User_AccountId
            WHERE U.Role = '${constants.ROLE.PATIENT}' AND U.ConfirmedFlag = 1`,
            {
                raw: true,
                type: QueryTypes.SELECT,
            }
        )
        .catch(err => {
            console.log("Error: ", err);
            res.status(500).send("Error in loading the Patients");
        });
    // Add Patient array attribute to each Doctor JSON object
    doctors.forEach((doctor, index) => {
        doctors[index].patients = [];
    });

    // Add Unassigned Patients array attribute to JSON object
    const unassignedPatients = [];

    patients.map(patient => {
        // Add Patients who are unassigned
        if (patient.doctorId === null) {
            unassignedPatients.push(patient);
        }
        // Add Patient corresponding to each Doctors
        doctors.map((doctor, indexDoctor) => {
            if (doctor.doctorId === patient.doctorId) {
                doctors[indexDoctor].patients.push(patient);
            }
        });
    });

    response = {
        assigned: doctors,
        unassigned: unassignedPatients,
    };
    res.status(200).send(response);
}

/**
 * Assign patient to a doctor as admin
 * PatientId: Id of the patient to be assigned
 * Doctor_DoctorId: DoctorId associated to the patient
 */
async function assignPatientDoctor(req, res) {
    await Patient.update(
        {
            Doctor_DoctorId: req.body.doctor_doctorId === -1 ? null : req.body.doctor_doctorId,
        },
        {
            where: {
                PatientId: req.body.patientId,
            },
        }
    )
        .then(patient => {
            if (patient[0]) {
                res.status(200).send("Patient has been assigned to a doctor");
            } else {
                res.status(400).send("Failed to execute the assignment");
            }
        })
        .catch(err => {
            console.log("Error: ", err);
            res.status(400).send("Failed to execute the assignment");
        });
}

/**
 * Confirm accounts as admin
 */
async function confirmAccount(req, res) {
    // can also be used to unconfirm account :)
    console.log("EMAIL PASSWORD", process.env.ADMIN_EMAIL_SENDER_PASSWORD);
    const updated = await User.update(
        {
            ConfirmedFlag: req.body.ConfirmedFlag,
        },
        {
            where: {
                AccountId: req.body.userId,
            },
        }
    ).catch(err => {
        console.log("[Approve-User] Error: ", err);
        res.status(400).send("Failed to confirm account");
    });
    if (updated && updated[0]) {
        const updatedUser = await User.findOne({
            where: {
                AccountId: req.body.userId,
            },
        });
        // Add user to Doctor table when approved
        if (updatedUser.Role === constants.ROLE.DOCTOR) {
            await Doctor.create({
                User_AccountId: req.body.userId,
            });
        }
        res.status(200).send("Account successfully confirmed !");
    }
}

/**
 * Reject accounts as admin
 */
async function rejectAccount(req, res) {
    const updated = await User.update(
        {
            RejectedFlag: req.body.rejectedFlag,
        },
        {
            where: {
                AccountId: req.body.userId,
            },
        }
    ).catch(err => {
        console.log("Error: ", err);
        res.status(400).send("Failed to reject account");
    });
    if (updated[0]) {
        // Send rejection email to rejected user
        const updatedUser = await User.findOne({
            where: {
                AccountId: req.body.userId,
            },
        });
        const mailOptions = {
            from: constants.ADMIN_EMAIL_ACCOUNT,
            to: updatedUser.Email,
            subject: `Demand for account role of ${updatedUser.Role} has been rejected`,
            html: `<h1>Hi ${updatedUser.FirstName},</h1> 
            <br> <h2>your demand for the account role of ${updatedUser.Role} has been rejected for certain reasons, please contact us for more details.</h2>`,
        };

        emailSender.emailTransporter.sendMail(mailOptions, error => {
            if (error) {
                console.log("Email error: ", error);
                res.status(400).send("Failed to send rejection email");
            } else {
                res.status(200).send("Account successfully rejected !");
            }
        });
    } else {
        res.status(400).send("Failed to reject account, user not found.");
    }
}

module.exports = {
    updateRole,
    assignPatientDoctor,
    confirmAccount,
    rejectAccount,
    getPatientsDoctors,
};
