const express = require("express");

const router = express.Router();
const authUser = require("../middleware/auth-user");
const adminController = require("../controllers/admin-controller");
const constants = require("../utils/constants");

router.use(express.json());
router.use(authUser.setUser);

// Admin test page
router.get("/", authUser.verifyUser, authUser.verifyRole(constants.ROLE.ADMIN), (req, res) => {
    res.send("If you can access this then you are an admin !");
});

// Update user roles as admin
router.patch("/update-role", authUser.verifyUser, authUser.verifyRole(constants.ROLE.ADMIN), (req, res) => {
    adminController.updateRole(req, res);
});

// Get Patients of each Doctors
router.get("/patients-doctors", adminController.getPatientsDoctors);

// Assign a patient to a doctor as admin
router.patch("/assign-patient-doctor", authUser.verifyUser, authUser.verifyRole(constants.ROLE.ADMIN), (req, res) => {
    adminController.assignPatientDoctor(req, res);
});

// Confirm Account
router.patch("/confirm-user-account", authUser.verifyUser, authUser.verifyRole(constants.ROLE.ADMIN), (req, res) => {
    adminController.confirmAccount(req, res);
});

// Reject Account
router.patch("/reject-user-account", authUser.verifyUser, authUser.verifyRole(constants.ROLE.ADMIN), (req, res) => {
    adminController.rejectAccount(req, res);
});

// Get Dashboard Stats
router.get("/get-dashboard-stats", (req, res) => {
    adminController.getDashboardStats(req, res)
});

module.exports = {
    router,
};
