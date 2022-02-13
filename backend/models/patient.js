const Sequelize = require('sequelize');
const db = require('../config/database');
const Status = require('./status');
const User = require('./User');

//Patient model associated with Database User table
const Patient = db.define(
  'Patient',
  {
    PatientId: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    Height: {
      type: Sequelize.INTEGER,
    },
    Weight: {
      type: Sequelize.INTEGER,
    },
    IsPrioritized: {
      type: Sequelize.BOOLEAN,
    },
    LastUpdatedDate: {
      type: Sequelize.DATE,
    },
    Doctor_DoctorID: {
      foreignKey: true,
      type: Sequelize.INTEGER,
    },
    User_AccountId: {
      foreignKey: true,
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Patient.belongsTo(User, { foreignKey: 'User_AccountId' });
// Patient.hasOne(Status, { foreignKey: 'Patient_PatientId' });
// Patient.associate = (models) => {
//   Patient.hasOne(models.Status, { foreignKey: 'Patient_PatientId' });
// };

// Status.belongsTo(Patient, { foreignKey: 'Patient_PatientId' });

module.exports = Patient;
