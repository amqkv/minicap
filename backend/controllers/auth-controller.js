const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Patient = require("../models/patient");
const constants = require("../utils/constants");

//  Save user to database
function register(req, res) {
    User.create({
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Gender: req.body.gender,
        DateOfBirth: req.body.dateOfBirth,
        Address: req.body.address,
        City: req.body.city,
        Email: req.body.email,
        Password: bcrypt.hashSync(req.body.password, 8),
        PhoneNumber: req.body.phoneNumber,
        PostalCode: req.body.postalCode,
        Role: req.body.accountRole,
        Confirmed: req.body.accountRole === constants.ROLE.PATIENT ? "true" : "false",
    }).then(user => {
        if (user) {
            res.json(user);

            //  Add User to Patient table if the user is a Patient
            if (user.Role === constants.ROLE.PATIENT) {
                Patient.create({
                    User_AccountId: user.AccountId,
                }).then(patient => {
                    if (patient) {
                        res.status(200);
                    } else {
                        res.status(400).send("error in adding patient to table");
                    }
                });
            }
        } else {
            res.status(400).send("error in registering a new user");
        }
    });
}

// Log In user
function logIn(req, res) {
    console.log(req.body);
    User.findOne({
        where: {
            Email: req.body.email,
        },
    })
        // eslint-disable-next-line consistent-return
        .then(user => {
            console.log("login");

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.Password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid password",
                });
            }
            const accessToken = jwt.sign({ email: req.body.email }, process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({ accessToken });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(`ERROR: ${err}`);
        });
}

//  Get authenticated user
function getAuthUser(req, res) {
    User.findOne({
        where: {
            email: req.user.email,
        },
    })
        .then(user => {
            res.json(user);
        })
        .catch(err => console.log(err));
}

module.exports = {
    register,
    logIn,
    getAuthUser,
};
