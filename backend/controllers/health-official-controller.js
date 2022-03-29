const { Sequelize } = require("sequelize");
const Moment = require("moment");
const Patient = require("../models/patient");
const Status = require("../models/status");
const User = require("../models/user");
const constants = require("../utils/constants");

async function getAllStatus() {
    const allStatus = await Status.findAll({
        raw: true,
        attributes: [
            [Sequelize.col("Status.StatusId"), "statusId"],
            [Sequelize.col("Status.Weight"), "weight"],
            [Sequelize.col("Status.Patient_PatientId"), "patientId"],
            [Sequelize.col("Status.Temperature"), "temperature"],
            [Sequelize.col("Status.Symptoms"), "symptoms"],
            [Sequelize.col("Status.IsReviewed"), "isReviewed"],
            [Sequelize.col("Status.StatusTime"), "statusTime"],
        ],
        order: [Sequelize.literal("StatusTime DESC")],
    }).catch(err => console.log(err));
    return allStatus;
}

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

const getUserStatus = async (req, res) => {
    const patientList = await Patient.findAll({
        raw: true,
        attributes: [
            [Sequelize.col("Patient.HasCovid"), "hasCovid"],
            [Sequelize.col("User.FirstName"), "firstName"],
            [Sequelize.col("User.LastName"), "lastName"],
            [Sequelize.col("User.Email"), "email"],
            [Sequelize.col("User.PhoneNumber"), "phoneNumber"],
            [Sequelize.col("User.Address"), "address"],
            [Sequelize.col("User.City"), "city"],
            [Sequelize.col("User.PostalCode"), "postalCode"],
            [Sequelize.col("User.AccountId"), "id"],
            [Sequelize.col("Patient.PatientId"), "patientId"],
            [Sequelize.col("Patient.IsPrioritized"), "isPrioritized"],
            [Sequelize.col("User.Gender"), "gender"],
            [Sequelize.col("User.DateOfBirth"), "dob"],
        ],
        include: [{ model: User, attributes: [] }],
    });
    const allStatus = await getAllStatus();
    const objectPatientList = {};

    for (const patient of patientList) {
        patient.status = [];
    }
    for (const status of allStatus) {
        status.weight = { value: status.weight, unit: "lbs" };
        status.temperature = { value: status.temperature, unit: "°C" };
        status.symptoms = { value: status.symptoms ? status.symptoms : "", unit: "" };
        status.lastUpdatedDate = new Date(status.statusTime).toLocaleDateString();
        status.lastUpdated = Moment().diff(status.statusTime, "hours", true)
            ? Moment().diff(status.statusTime, "hours", true) - constants.MOMENT_TIMEZONE_ADJUSTMENT
            : 0;
    }

    patientList.map(patient => {
        objectPatientList[patient.patientId] = patient;
    });
    allStatus.map(status => {
        objectPatientList[status.patientId]?.status.push(status);
    });
    res.json(Object.values(objectPatientList));
};

module.exports = {
    updatePatientStatus,
    getUserStatus,
};
