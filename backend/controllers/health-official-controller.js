const Patient = require("../models/patient");

async function updatePatientStatus(req, res) {
    Patient.update(
        {
            HasCovid: req.body.covidChange ? "1" : "0",
        },
        {
            where: {
                User_AccountId: req.body.id,
            },
        }
    )
        .then(() => res.status(200).send(true))
        .catch(() => res.status(400).send(false));
}
module.exports = {
    updatePatientStatus,
};
