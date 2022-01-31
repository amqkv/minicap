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
    ImmigrationOfficial: [],
    Admin: [],
  };

  roles.map((user) => {
    console.log(user.Role);
    if (rolesObject.hasOwnProperty(user.Role)) {
      console.log('im in');
      rolesObject[user.Role].push(user);
    }
  });
  console.log(rolesObject);
  res.json(rolesObject);
};

module.exports = {
  getAllRoles,
};
