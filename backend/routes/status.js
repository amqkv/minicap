const express = require("express");

const router = express.Router();
const statusController = require("../controllers/status-controller");

router.use(express.json());

// create status in database
router.post("/addStatus", (req, res) => {
    statusController.addStatus(req, res);
});

// find previous status in database
router.get("/getAllStatus/:patientId", (req, res) => {
    statusController.getAllStatus(req, res);
});

module.exports = {
    router,
};