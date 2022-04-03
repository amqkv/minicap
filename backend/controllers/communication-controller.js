const Communication = require("../models/communication");

async function getMessage(req, res) {
    await Communication.findAll({
        raw: true,
        attributes: ["Content", "Doctor_AccountId", "Patient_AccountId", "Author_AccountId"],
        where: {
            Patient_AccountId: req.params.patientAccountId,
        },
    })
        .then(pastMessages => {
            res.json(pastMessages);
        })
        .catch(err => {
            res.status(400).send(err);
        });
}

async function sendMessage(socketData) {
    await Communication.create({
        Content: socketData.Content,
        Doctor_AccountId: socketData.Doctor_AccountId,
        Patient_AccountId: socketData.Patient_AccountId,
        Author_AccountId: socketData.Author_AccountId,
    });
}

module.exports = {
    getMessage,
    sendMessage,
};
