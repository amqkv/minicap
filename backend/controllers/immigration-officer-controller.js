const { Sequelize, Op } = require("sequelize");
const User = require("../models/user");
const Patient = require("../models/patient");

async function findUsersStatus(req, res) {
    // basic essam query
    Patient.findAll({
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
            [Sequelize.col("User.Gender"), "gender"],
            [Sequelize.col("User.DateOfBirth"), "dob"],
        ],
        include: [{ model: User, attributes: [] }],
    })
        // return value as json object
        .then(patients => {
            res.json(patients);
        });
}

async function countUsersStatus(req, res) {
    Promise.all([
        // counting number of patients positive with covid
        Patient.count({
            distinct: "someColumn",
            where: {
                HasCovid: {
                    [Op.or]: [true, 1],
                },
            },
        }),
        // counting number of patients negative with covid
        Patient.count({
            distinct: "someColumn",
            where: {
                HasCovid: {
                    [Op.or]: [false, null, 0],
                },
            },
        }),
    ])
        // return value as json object
        .then(counts => {
            res.json([
                {
                    "COVID Positive Patients": counts[0],
                    "COVID Negative Patients": counts[1],
                },
            ]);
        });
}

module.exports = {
    findUsersStatus,
    countUsersStatus,
};
