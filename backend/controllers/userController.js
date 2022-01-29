const { QueryTypes } = require('sequelize');
const db = require('../config/database');

const getAllRoles = async (req, res, next) => {
  const roles = await db.query(
    'SELECT AccountId, FirstName, LastName, Role FROM [User]t',
    {
      logging: console.log,
      type: QueryTypes.SELECT,
    }
  );

  let rolesObject = {
    Patient: [],
    Doctor: [],
    HealthOfficial: [],
    ImmigrationOfficial: [],
    WebAdmin: [],
  };

  roles.map((user) => {
    rolesObject[user.Role].push(user);
  });

  res.json(rolesObject);
};

module.exports = {
  getAllRoles,
};
