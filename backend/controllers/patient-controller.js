const RequiredDetails = require('../models/RequiredDetails');
const Patient = require('../models/Patient');
const User = require('../models/User');
const Sequelize = require('sequelize');

function getRequiredDetails(req, res) {
  RequiredDetails.findAll({
    raw: true,
    where: {
      Patient_PatientId: req.params.patientId,
    },
  })
    .then((requiredDetails) => {
      // Renaming the detail names
      let temp = [];
      let keys = Object.keys(requiredDetails[0]);
      for (let i = 1; i < keys.length; i++) {
        if (keys[i].includes('Required')) {
          temp.push({
            [keys[i].replace('Required', '')]: requiredDetails[0][keys[i]],
          });
        }
      }
      res.json(temp);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Could not find details');
    });
}

function updateRequiredDetails(req, res) {
  RequiredDetails.update(
    {
      WeightRequired: req.body[0].Weight,
      TemperatureRequired: req.body[1].Temperature,
      SymptomsRequired: req.body[2].Symptoms,
    },
    {
      where: { Patient_PatientId: req.params.patientId },
    }
  )
    .then(res.status(200).json({ message: 'Details have been updated successfully' }))
    .catch((err) => res.status(400).json({ message: 'Could not update details.' }));
}

function getPatientsInfo(req, res) {
  console.log('getpatientsinfo');

  Patient.findAll({
    // <TODO> Get current doctor's ID
    where: { Doctor_DoctorID: req.params.doctorId },
    raw: true,
    attributes: [
      [Sequelize.col('Patient.PatientId'), 'patientId'],
      [Sequelize.col('Patient.Height'), 'height'],
      [Sequelize.col('Patient.Weight'), 'weight'],
      [Sequelize.col('Patient.IsPrioritized'), 'isPrioritized'],
      [Sequelize.col('Patient.LastUpdatedDate'), 'lastUpdatedDate'],
      // Not sure if we need doctor id
      [Sequelize.col('Patient.Doctor_DoctorID'), 'doctorID'],
      [Sequelize.col('Patient.User_AccountId'), 'accountId'],
      [Sequelize.col('User.FirstName'), 'firstName'],
      [Sequelize.col('User.LastName'), 'lastName'],
      [Sequelize.col('User.Gender'), 'gender'],
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
    ],
  })
    .then((patient) => {
      console.log(patient);
      res.json(patient);
    })
    .catch((err) => console.log(err));
}

module.exports = {
  getRequiredDetails,
  updateRequiredDetails,
  getPatientsInfo,
};
