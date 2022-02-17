const User = require("../models/user");

const getAllUserRoles = async (req, res, next) => {
    const roles = await User.findAll({
        attributes: ["AccountId", "FirstName", "LastName", "Role"],
    });
    let rolesObject = {
        Patient: [],
        Doctor: [],
        HealthOfficial: [],
        ImmigrationOfficer: [],
        Admin: [],
    };

    roles.map(user => {
        if (rolesObject.hasOwnProperty(user.dataValues.Role)) {
            rolesObject[user.dataValues.Role].push(user.dataValues);
        }
    });
    res.json(rolesObject);
};

const getPendingUsers = async (req, res) => {
  // Why do is the boolean a string LMAO
  const pendingUsers =  await User.findAll({
    where: {
      Confirmed: 'false'
    },
    attributes: ['AccountId', 'FirstName', 'LastName', 'Role', 'Confirmed'],

  })
  res.json(pendingUsers);
};

module.exports = {
  getAllUserRoles, getPendingUsers
};
