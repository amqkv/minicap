const express = require('express');
const router = express.Router();
const RequiredDetails = require('../models/RequiredDetails');
const patientController = require('../controllers/patientController');

router.use(express.json());

//Get the required details for the patient
router.get('/getRequiredDetails/:patientId', (req, res) => {
  patientController.getRequiredDetails(req, res);
});

//Update the required details list that the patient has to fill out
router.post('/:patientId/updateRequiredDetails', (req, res) => {
  patientController.updateRequiredDetails(req, res);
});

module.exports = {
  router: router,
};
