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
 *
 *
 */
async function getPatientsDoctors(req, res) {
    const doctors = await db
        .query(
            `
        SELECT U.AccountId, U.FirstName, U.LastName, U.Email, U.PhoneNumber, D.DoctorId
        FROM Users U, Doctor D
        WHERE U.Role = '${constants.ROLE.DOCTOR}' AND U.Confirmed = 'true' AND U.AccountId = D.User_AccountId`,
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
        SELECT U.AccountId, U.FirstName, U.LastName, U.Email, U.PhoneNumber, P.PatientId, P.Doctor_DoctorId
        FROM Users U, Patient P
        WHERE U.Role = '${constants.ROLE.PATIENT}' AND U.Confirmed = 'true' AND U.AccountId = P.User_AccountId;`,
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
        doctors[index].Patients = [];
    });
    // Add Unassigned Patients array attribute to JSON object
    doctors.push({
        UnassignedPatients: [],
    });

    patients
        .map(patient => {
            // Add Patients who are unassigned
            if (patient.Doctor_DoctorId === null) {
                doctors[doctors.length - 1].UnassignedPatients.push(patient);
            }
            // Add Patient corresponding to each Doctors
            doctors.map((doctor, indexDoctor) => {
                if (doctor.DoctorId === patient.Doctor_DoctorId) {
                    doctors[indexDoctor].Patients.push(patient);
                }
            });
        })
        .catch(err => {
            console.log("Error:", err);
            res.status(500).send("Error in retrieving Patients associated to Doctors");
        });
    res.status(200).send(doctors);
}

/**
 * Assign patient to a doctor as admin
 * PatientId: Id of the patient to be assigned
 * Doctor_DoctorId: DoctorId associated to the patient
 */
async function assignPatientDoctor(req, res) {
    await Patient.update(
        {
            Doctor_DoctorId: req.body.doctor_doctorId,
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

module.exports = {
    updateRole,
    assignPatientDoctor,
    getPatientsDoctors,
};
