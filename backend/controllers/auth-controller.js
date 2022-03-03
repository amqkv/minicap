const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Moment = require("moment");
const User = require("../models/user");
const Patient = require("../models/patient");
const RequiredDetails = require("../models/required-details");
const constants = require("../utils/constants");
const Status = require("../models/status");

//  Save user to database
async function register(req, res) {
    const newUser = await User.create({
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
        ConfirmedFlag:
            req.body.accountRole === constants.ROLE.PATIENT ? constants.BOOLEANS.TRUE : constants.BOOLEANS.FALSE,
    });
    if (newUser) {
        // Add User to Patient table if user is a patient
        if (newUser.Role === constants.ROLE.PATIENT) {
            const newPatient = await Patient.create({
                User_AccountId: newUser.AccountId,
                IsPrioritized: constants.BOOLEANS.FALSE,
                HasCovid: constants.BOOLEANS.FALSE,
            });

            if (newPatient) {
                // Add all required details by default
                await RequiredDetails.create({
                    WeightRequired: constants.BOOLEANS.TRUE,
                    TemperatureRequired: constants.BOOLEANS.TRUE,
                    SymptomsRequired: constants.BOOLEANS.TRUE,
                    Patient_PatientId: newPatient.PatientId,
                });

                // Add a status by default
                await Status.create({
                    Temperature: 0,
                    StatusTime: Moment().format("YYYY-MM-DD HH:mm:ss"),
                    IsReviewed: constants.BOOLEANS.FALSE,
                    Weight: 0,
                    Patient_PatientId: newPatient.PatientId,
                });
            } else {
                res.status(400).send("Error in adding Required details to table");
            }
        }
        res.status(200).send(newUser);
    } else {
        res.status(400).send("Error in registering user to table");
    }
}

// Log In user
function logIn(req, res) {
    User.findOne({
        where: {
            Email: req.body.email,
        },
    })
        .then(user => {
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
