const User = require("../models/User");
const db = require('../config/database');
const users = require("../routes/users");

var signedUser;

//Role initialization
const ROLE = {
    ADMIN: 'Admin',
    DOCTOR: 'Doctor',
    HEALTH_OFFICIAL: 'HealthOfficial',
    IMMIGRATION_OFFICER: 'ImmigrationOfficer',
    PATIENT: 'Patient',
}

//Middleware to set the signed in user
async function setUser(req, res, next) {
    const userId = req.body.accountId;
    if(userId) {
        signedUser = await User.findOne({
            where: {
              accountId: userId
            }
        })
          .catch(err => console.log(err))
    }
    next();
}

//Middleware for signed in verification
function verifyUser(req, res, next) {
    if(signedUser == null) {
        res.status(403);
        return res.send("You need to sign in first");
    }

    next();
}

//Middleware for role verification
function verifyRole(role) {
    return (req, res, next) => {
        if(signedUser.Role !== role) {
            res.status(401);
            return res.send("Not allowed");
        }

        next();
    }
}

module.exports = {
    ROLE,
    verifyUser,
    verifyRole,
    setUser
}