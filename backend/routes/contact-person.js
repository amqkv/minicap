const express = require("express");

const router = express.Router();
router.use(express.json());

const contactPersonController = require("../controllers/contact-person-controller");

router.post("/postTrackContacts/:id", (req, res) => {
    contactPersonController.postTrackContacts(req, res);
});

router.get("/getTrackContacts/", (req, res) => {
    contactPersonController.getTrackContacts(req, res);
});

router.get("/getTrackContactsId/:id", (req, res) => {
    contactPersonController.getTrackContactsId(req, res);
});

router.delete("/deleteTrackContacts/", (req, res) => {
    contactPersonController.deleteTrackContacts(req, res);
});

router.patch("/sendEmail/", (req, res) => {
    contactPersonController.sendEmail(req, res);
});

module.exports = {
    router,
};
