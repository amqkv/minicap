const Sequelize = require("sequelize");
const db = require("../config/database");

// Status model associated with Database Status table
const Status = db.define(
    "Status",
    {
        StatusID: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
        },
        Temperature: {
            type: Sequelize.INTEGER,
        },
        StatusTime: {
            type: Sequelize.STRING,
        },
        IsReviewed: {
            type: Sequelize.BOOLEAN,
        },
        Patient_PatientId: {
            foreignKey: true,
            type: Sequelize.INTEGER,
        },
        Weight: {
            type: Sequelize.INTEGER,
        },
        Symptoms: {
            type: Sequelize.STRING,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Status;