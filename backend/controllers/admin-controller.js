const User = require("../models/user");
const Patient = require("../models/patient");

/**
 * Update role of user as admin
 * newRole: new role to assign to the user
 * oldRole: old role of the user
 * AccountId: AccountId of the user that the role will be modified
 */
async function updateRole(req, res) {
    if (req.body.newRole === req.body.oldRole) {
<<<<<<< HEAD
        res.status(200);
=======
        await res.status(200).send("Same role");
>>>>>>> origin/main
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
<<<<<<< HEAD
            .then(() => {
                res.status(200).send("Role successfully updated !");
=======
            .then(user => {
                if (user[0]) {
                    res.status(200).send("Role successfully updated !");
                } else {
                    res.status(400).send("Failed to execute the role update");
                }
>>>>>>> origin/main
            })
            .catch(err => {
                res.status(500).send(`Error:${err}`);
            });
    }
}

/**
 * Assign patient to a doctor as admin
 * PatientId: Id of the patient to be assigned
 * Doctor_DoctorId: DoctorId associated to the patient
 */
function assignPatientDoctor(req, res) {
    Patient.update(
        {
            Doctor_DoctorId: req.body.doctor_doctorId,
<<<<<<< HEAD
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

function confirmAccount(req, res)
{
    User.update(
        {
            Confirmed: req.body.Confirmed
        },
        {
            where: {
                AccountId: req.body.userId
            }
        }
    )
    .then(() => {
        res.status(200).send("Account successfully confirmed !");
    })
    .catch(err => {
        console.log("Error: ", err);
        res.status(400).send("Failed to confirm account");
    })
=======
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
>>>>>>> origin/main
}

module.exports = {
    updateRole,
    assignPatientDoctor,
<<<<<<< HEAD
    confirmAccount
=======
>>>>>>> origin/main
};
