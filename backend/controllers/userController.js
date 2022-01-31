const { QueryTypes } = require('sequelize');
const db = require('../config/database');

const getAllRoles = async (req, res, next) => {
  const roles = await db.query(
    'SELECT AccountId, FirstName, LastName, Role FROM MinicapDatabase.dbo.Users t',
    {
      logging: console.log,
      type: QueryTypes.SELECT,
    }
  );
  let rolesObject = {
    Patient: [],
    Doctor: [],
    HealthOfficial: [],
    ImmigrationOfficer: [],
    Admin: [],
  };

  roles.map((user) => {
    if (rolesObject.hasOwnProperty(user.Role)) {
      rolesObject[user.Role].push(user);
    }
  });
  res.json(rolesObject);
};

module.exports = {
  getAllRoles,
};
