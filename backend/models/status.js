const Sequelize = require('sequelize');
const db = require('../config/database');
const Patient = require('./Patient');

//Status model associated with Database User table
const Status = db.define(
  'Status',
  {
    StatusId: {
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
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// Status.belongsTo(Patient, { foreignKey: 'Patient_PatientId' });
// Status.associate = (models) => {
// Status.belongsTo(models.Patient, { foreignKey: 'Patient_PatientId' });
// };

module.exports = Status;
