const express = require("express");

const router = express.Router();
const doctorController = require("../controllers/doctor-controller");

router.use(express.json());

// Get the required details for the patient
router.get("/getRequiredDetails/:patientId", (req, res) => {
    doctorController.getRequiredDetails(req, res);
});

// Update the required details list that the patient has to fill out
router.patch("/updateRequiredDetails", (req, res) => {
    doctorController.updateRequiredDetails(req, res);
});

// Get all patients info for doctor's dashboard
router.get("/getPatientsInfo/:userId", (req, res) => {
    doctorController.getPatientsInfo(req, res);
});

module.exports = {
    router,
};
