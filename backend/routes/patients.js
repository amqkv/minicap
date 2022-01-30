const express = require('express');
const router = express.Router();
const RequiredDetails = require('../models/RequiredDetails');

router.use(express.json());

//Get the required details for the patient
router.get('/getRequiredDetails/:patientId', (req, res) => {
  console.log('getRequiredDetails');
  RequiredDetails.findAll({
    raw: true,
    where: {
      Patient_PatientId: req.params.patientId,
    },
  })
    .then((requiredDetails) => {
      // Renaming the detail names
      let keys = Object.keys(requiredDetails[0]);
      let temp = [];
      for (let i = 1; i < keys.length; i++) {
        if (keys[i].includes('Required')) {
          temp.push({
            [keys[i].replace('Required', '')]: requiredDetails[0][keys[i]],
          });
        }
      }
      requiredDetails = temp;
      res.json(requiredDetails);
    })
    .catch((err) => console.log(err));
});

//Update the required details list that the patient has to fill out
router.post('/updateRequiredDetails', (req, res) => {
  console.log(req.body);
  RequiredDetails.update(
    {
      WeightRequired: req.body.WeightRequired,
      TemperatureRequired: req.body.TemperatureRequired,
      SymptomsRequired: req.body.SymptomsRequired,
    },
    {
      where: { Patient_PatientId: req.body.Patient_PatientId },
    }
  )
    .then(res.status(200).json({ message: 'Details have been updated successfully.' }))
    .catch((err) => res.status(400).json({ message: 'Could not update details.' }));
});

module.exports = {
  router: router,
};
