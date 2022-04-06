const express = require("express");

const router = express.Router();
router.use(express.json());

const patientController = require("../controllers/patient-controller");

// Get the required details for the patient
router.get("/getRequiredDetails/:accountId", (req, res) => {
    patientController.getRequiredDetails(req, res);
});

// Get doctor assigned to patient
router.get("/getAssignedDoctor/:accountId", (req, res) => {
    patientController.getAssignedDoctor(req, res);
});

// know if the patient is positive or negative
router.get("/isPositive/:accountId", (req, res) => {
    patientController.isPositive(req, res);
});

router.get("/getName/:id", (req, res) => {
    patientController.getName(req, res);
});

router.get("/getAppointmentForPatients/:accountId", (req, res) => {
    patientController.getAppointmentForPatients(req, res);
});

router.patch("/appointmentConfirmation", (req, res) => {
    patientController.appointmentConfirmation(req, res);
});

router.get("/getConfirmedAppointments/:accountId", (req, res) => {
    patientController.getConfirmedAppointments(req, res);
});



module.exports = {
    router,
};
