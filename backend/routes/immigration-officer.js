const express = require("express");

const router = express.Router();
router.use(express.json());

const immigrationOfficerController = require("../controllers/immigration-officer-controller");

// get required details of patients
router.get("/findUsersStatus", (req, res) => {
    immigrationOfficerController.findUsersStatus(req, res);
});


module.exports = {
    router,
};
