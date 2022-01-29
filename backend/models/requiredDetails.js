const Sequelize = require('sequelize');
const db = require('../config/database');

//User model associated with Database User table
const RequiredDetails = db.define(
  'RequiredDetails',
  {
    Id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    WeightRequired: {
      type: Sequelize.BOOLEAN,
    },
    TemperatureRequired: {
      type: Sequelize.BOOLEAN,
    },
    SymptomsRequired: {
      type: Sequelize.BOOLEAN,
    },
    Patient_PatientId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = RequiredDetails;
