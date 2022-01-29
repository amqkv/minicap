const User = require("../models/user");
const db = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

//Save user to database
function register(req,res) {
    const newUser = User.create({
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
        Role: req.body.role
    }).then(user => {
        if(user) {
            console.log("new user created");
            res.json(user)
        } else {
            res.status(400).send('error in registering a new user');
        }
    });
}

//Log In user
function logIn(req, res) {
    User.findOne({ 
        where: {
          Email: req.body.email
        },
    }).then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.Password);
        if(!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password"
            });
        }
        console.log("Log In Successful !");
        var accessToken = jwt.sign({email: req.body.email}, process.env.ACCESS_TOKEN_SECRET);

        res.json({ accessToken: accessToken });

    }).catch(err => {
        res.status(500).send("ERROR: "+err);
    });
}

//Get authenticated user
function getAuthUser(req, res) {
    User.findOne({
        where: {
          email: req.user.email
        }
    }).then(user => {
          console.log("user: ", user);
          res.json(user);
    })
      .catch(err => console.log(err))
}

module.exports = {
    register,
    logIn,
    getAuthUser
};