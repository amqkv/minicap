const express = require('express');
const router = express.Router();
const db = require('../config/database');
const RequiredDetails = require('../models/RequiredDetails');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');
const authJwt = require('../middleware/authJwt');

router.use(express.json());

//Get the required details for the patient
router.get('/getRequiredDetails/:patientId', (req, res) => {
  RequiredDetails.findAll({
    where: {
      Patient_PatientId: req.params.patientId,
    },
  })
    .then((requiredDetails) => {
      console.log(requiredDetails);
      res.json(requiredDetails);
    })
    .catch((err) => console.log(err));
});

module.exports = {
  router: router,
};
