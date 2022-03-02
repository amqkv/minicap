const express = require("express");

const router = express.Router();
const statusController = require("../controllers/status-controller");

router.use(express.json());

// create status in database
router.post("/addStatus", (req, res) => {
    statusController.addStatus(req, res);
});

// set status to reviewed
router.patch("/review-status", (req, res) => {
    statusController.reviewStatus(req, res);
});

router.patch("/review-status/all", (req, res) => {
    statusController.reviewAllStatuses(req, res);
});

// find previous status in database
router.get("/getAllStatus/:userId", (req, res) => {
    statusController.getAllStatus(req, res);
});

module.exports = {
    router,
};
