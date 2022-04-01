const express = require("express");

const router = express.Router();
router.use(express.json());

const patientController = require("../controllers/patient-controller");

// Get the required details for the patient
router.get("/getRequiredDetails/:accountId", (req, res) => {
    patientController.getRequiredDetails(req, res);
});

//know if the patient is positive or negative
router.get("/isPositive/:accountId", (req, res) => {
    patientController.isPositive(req, res);
});

router.get("/getAppointmentForPatients/:patientId", (req, res) => {
    patientController.getAppointmentForPatients(req, res);
});

module.exports = {
    router,
};
