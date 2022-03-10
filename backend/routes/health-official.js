const express = require("express");

const router = express.Router();
router.use(express.json());

const healthOfficialController = require("../controllers/health-official-controller");

// get required details of patients
router.patch("/updatePatientStatus", (req, res) => {
    healthOfficialController.updatePatientStatus(req, res);
});

module.exports = {
    router,
};
