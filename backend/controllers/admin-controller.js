const { QueryTypes } = require("sequelize");
const User = require("../models/user");
const Patient = require("../models/patient");
const constants = require("../utils/constants");
const db = require("../config/database");

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
        await User.update(
            {
                Role: req.body.newRole,
            },
            {
                where: {
                    AccountId: req.body.userId,
                },
            }
        )
            .then(user => {
                if (user[0]) {
                    res.status(200).send("Role successfully updated !");
                } else {
                    res.status(400).send("Failed to execute the role update");
                }
            })
            .catch(err => {
                res.status(500).send(`Error:${err}`);
            });
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
                console.log("Patient has been assigned to doctor");
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

function confirmAccount(req, res) {
    // can also be used to unconfirm account :)
    User.update(
        {
            ConfirmedFlag: req.body.ConfirmedFlag,
        },
        {
            where: {
                AccountId: req.body.userId,
            },
        }
    )
        .then(() => {
            res.status(200).send("Account successfully confirmed !");
        })
        .catch(err => {
            console.log("[Approve-User] Error: ", err);
            res.status(400).send("Failed to confirm account");
        });
}

module.exports = {
    updateRole,
    assignPatientDoctor,
    confirmAccount,
    getPatientsDoctors,
};
