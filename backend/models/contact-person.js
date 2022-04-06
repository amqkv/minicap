const Sequelize = require("sequelize");
const db = require("../config/database");
const Patient = require("./patient");

// ContactPerson model associated with Database ContactPerson table
const ContactPerson = db.define(
    "ContactPerson",
    {
        Patient_PatientId: {
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        FirstName: {
            primaryKey: true,
            type: Sequelize.STRING,
        },
        LastName: {
            primaryKey: true,
            type: Sequelize.STRING,
        },
        Email: {
            primaryKey: true,
            type: Sequelize.STRING,
        },
        DateOfContact: {
            primaryKey: true,
            type: Sequelize.STRING,
        },
        Telephone: {
            primaryKey: true,
            type: Sequelize.STRING,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

ContactPerson.belongsTo(Patient, { foreignKey: "Patient_PatientId" });

module.exports = ContactPerson;
