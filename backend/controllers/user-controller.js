const User = require("../models/user");

const getAllUserRoles = async (req, res) => {
    const roles = await User.findAll({
        attributes: ["AccountId", "FirstName", "LastName", "Role"],
    });
    const rolesObject = {
        Patient: [],
        Doctor: [],
        HealthOfficial: [],
        ImmigrationOfficer: [],
        Admin: [],
    };

    // eslint-disable-next-line array-callback-return
    roles.map(user => {
        if (Object.prototype.hasOwnProperty.call(rolesObject, user.dataValues.Role)) {
            rolesObject[user.dataValues.Role].push(user.dataValues);
        }
    });
    res.json(rolesObject);
};

module.exports = {
    getAllUserRoles,
};
