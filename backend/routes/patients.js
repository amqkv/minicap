const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient-controller");

const router = express.Router();
router.use(express.json());

const patientController = require("../controllers/patient-controller");

// Get the required details for the patient
router.get("/getRequiredDetails/:patientId", (req, res) => {
    patientController.getRequiredDetails(req, res);
});

//Update the required details list that the patient has to fill out
router.patch("/:patientId/updateRequiredDetails", (req, res) => {
    patientController.updateRequiredDetails(req, res);
});

// Get all patients info for doctor's dashboard
router.get("/getPatientsInfo/:doctorId", (req, res) => {
    patientController.getPatientsInfo(req, res);
});

module.exports = {
    router,
};
