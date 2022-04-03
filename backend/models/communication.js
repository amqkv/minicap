const Sequelize = require("sequelize");
const db = require("../config/database");

// Communication model associated with Database Communication table
const Communication = db.define(
    "Communication",
    {
        CommunicationId: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
        },
        Content: {
            type: Sequelize.STRING,
        },
        Doctor_AccountId: {
            type: Sequelize.INTEGER,
        },
        Patient_AccountId: {
            type: Sequelize.INTEGER,
        },
        Author_AccountId: {
            type: Sequelize.INTEGER,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Communication;
