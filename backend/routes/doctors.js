const express = require("express");

const router = express.Router();
const doctorController = require("../controllers/doctor-controller");

router.use(express.json());

// Update the required details list that the patient has to fill out
router.patch("/updateRequiredDetails", (req, res) => {
    doctorController.updateRequiredDetails(req, res);
});

// Get all patients info for doctor's dashboard
router.get("/getPatientsInfo/:userId", (req, res) => {
    doctorController.getPatientsInfo(req, res);
});

router.get("/getPatientsDashboardInfo/:userId", (req, res) => {
    doctorController.getPatientsDashboardInfo(req, res);
});

module.exports = {
    router,
};
