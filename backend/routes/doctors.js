const express = require("express");
const constants = require("../utils/constants");
const authUser = require("../middleware/auth-user");
const doctorController = require("../controllers/doctor-controller");

const router = express.Router();
router.use(authUser.setUser);

router.use(express.json());

// Update the required details list that the patient has to fill out
router.patch("/updateRequiredDetails", (req, res) => {
    doctorController.updateRequiredDetails(req, res);
});

// Get all patients info for doctor's dashboard
router.get("/getPatientsInfo/:userId", (req, res) => {
    doctorController.getPatientsInfo(req, res);
});

/**
 * Update the priority state of a patient
 * Middlewares:
 * verifyUser: check if for signed in user
 * verifyRole: check if the request has the allowed role
 */
router.patch("/updatePriority", authUser.verifyUser, authUser.verifyRole(constants.ROLE.DOCTOR), (req, res) => {
    doctorController.updatePriority(req, res);
});

module.exports = {
    router,
};
