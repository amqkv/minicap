const Sequelize = require("sequelize");
const db = require("../config/database");

// Patient model associated with Database Patients table
const Patient = db.define(
    "Patient",
    {
        PatientId: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
        },
        Height: {
            type: Sequelize.STRING,
        },
        Weight: {
            type: Sequelize.STRING,
        },
        IsPrioritized: {
            type: Sequelize.BOOLEAN,
        },
        LastUpdatedDate: {
            type: Sequelize.STRING,
        },
        Doctor_DoctorId: {
            type: Sequelize.INTEGER,
        },
        User_AccountId: {
            type: Sequelize.INTEGER,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Patient;
