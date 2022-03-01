const Sequelize = require("sequelize");
const db = require("../config/database");
const Users = require("../models/user");

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
        HasCovid: {
            type: Sequelize.BOOLEAN,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Patient.belongsTo(Users, { foreignKey: "User_AccountId" });

module.exports = Patient;
