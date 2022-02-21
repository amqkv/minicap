const Sequelize = require("sequelize");
const db = require("../config/database");

// Doctor model associated with Database Patients table
const Doctor = db.define(
    "Doctor",
    {
        DoctorId: {
            primaryKey: true,
            autoIncrement: true,
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

module.exports = Doctor;
