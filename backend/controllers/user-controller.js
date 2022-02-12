const User = require('../models/user');

const getAllUserRoles = async (req, res, next) => {
  const roles = await User.findAll({
    attributes: ['AccountId', 'FirstName', 'LastName', 'Role'],
  });
  let rolesObject = {
    Patient: [],
    Doctor: [],
    HealthOfficial: [],
    ImmigrationOfficer: [],
    Admin: [],
  };

  roles.map((user) => {
    if (rolesObject.hasOwnProperty(user.dataValues.Role)) {
      rolesObject[user.dataValues.Role].push(user.dataValues);
    }
  });
  res.json(rolesObject);
};

module.exports = {
  getAllUserRoles,
};
