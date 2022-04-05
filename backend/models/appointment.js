const Sequelize = require("sequelize");
const db = require("../config/database");

//  User model associated with Database User table
const Appointment = db.define(
    "Appointment",
    {
        AppointmentId: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
        },
        Patient_PatientId: {
            type: Sequelize.INTEGER,
        },
        Doctor_DoctorId: {
            type: Sequelize.INTEGER,
        },
        Date: {
            type: Sequelize.STRING,
        },
        Time: {
            type: Sequelize.STRING,
        },
        Status: {
            type: Sequelize.STRING,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

<<<<<<< HEAD
module.exports = Appointment;
=======
module.exports = Appointment;
>>>>>>> 96248b7a15152a0628224310a069897fd7845bf3
