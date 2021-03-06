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

    roles.map(user => {
        if (Object.prototype.hasOwnProperty.call(rolesObject, user.dataValues.Role)) {
            rolesObject[user.dataValues.Role].push(user.dataValues);
        }
    });
    res.json(rolesObject);
};

const getPendingUsers = async (req, res) => {
    const pendingUsers = await User.findAll({
        where: {
            ConfirmedFlag: false,
            RejectedFlag: false,
        },
        attributes: ["AccountId", "FirstName", "LastName", "Role", "ConfirmedFlag"],
    }).catch(err => {
        console.log("Get Pending Users List Error: ", err);
        res.status(400).send("Error fetching pending users list!");
    });
    res.json({ Users: pendingUsers });
};

module.exports = {
    getAllUserRoles,
    getPendingUsers,
};
