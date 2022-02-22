const db = require("../config/database");
const { QueryTypes, Sequelize } = require("sequelize");
const User = require("../models/user");
const Patient = require("../models/patient");

async function findUsersStatus(req, res) {
    // basic essam query
    Patient.findAll({
        attributes: [
            [Sequelize.col('Patient.HasCovid'), 'hasCovid'],
            [Sequelize.col('User.FirstName'), 'firstName'],
            [Sequelize.col('User.LastName'), 'lastName'],
            [Sequelize.col('User.Email'), 'email'],
            [Sequelize.col('User.PhoneNumber'), 'phoneNumber'],
            [Sequelize.col('User.Address'), 'address'],
            [Sequelize.col('User.City'), 'city'],
            [Sequelize.col('User.PostalCode'), 'postalCode'],
            [Sequelize.col('User.AccountId'), 'id'],
            [Sequelize.col('User.Gender'), 'gender'],
            [Sequelize.col('User.DateOfBirth'), 'dob'],
        ],
        include: [
            { model: User, attributes: [] },
        ],
    })
        // return value as json object
        .then(patients => {
            res.json(patients)
        });

}
module.exports = {
    findUsersStatus,
};
