const User = require('../models/user');
const Patient = require('../models/patient');

/**
 * Update role of user as admin
 * newRole: new role to assign to the user
 * oldRole: old role of the user
 * AccountId: AccountId of the user that the role will be modified
 */
function updateRole(req, res) {
  if (req.body.newRole === req.body.oldRole) {
    res.status(200);
  } else {
    User.update({
        Role: req.body.newRole,
      },
      {
        where: {
          AccountId: req.body.userId,
        },
      }
    )
      .then((result) => {
        console.log('Role successfully updated !');
        res.status(200).send('Role successfully updated !');
      })
      .catch((err) => {
        res.status(500).send('Error:' + err);
      });
  }
}

/**
 * Assign patient to a doctor as admin
 * PatientId: Id of the patient to be assigned
 * Doctor_DoctorId: DoctorId associated to the patient
 */
function assignPatientDoctor(req, res) {
  Patient.update({
    Doctor_DoctorId: req.body.doctor_doctorId
  },
  {
    where: {
      PatientId: req.body.patientId
    }
  }).then(patient => {
      if(patient[0]) {
          console.log("Patient has been assigned to doctor");
          res.status(200).send('Patient has been assigned to a doctor');
      } else {
          res.status(400).send('Patient not found');
      }
  }).catch(err => {
    console.log("Error: ", err);
  });  
}

module.exports = {
  updateRole,
  assignPatientDoctor
};
