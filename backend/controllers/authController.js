const User = require("../models/user");
const db = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

function register(req,res) {
    //Save user to database
    const newUser = User.create({
        FirstName: req.body.firstname,
        LastName: req.body.lastname,
        Gender: req.body.gender,
        Birthdate: req.body.birthdate,
        Address: req.body.address,
        City: req.body.city,
        Email: req.body.email,
        Password: bcrypt.hashSync(req.body.password, 8),
        PhoneNumber: req.body.phonenumber
    }).then(user => {
        if(user) {
            console.log("new user created");
            res.json(user)
        } else {
            res.status(400).send('error in registering a new user');
        }
    });
}

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

const authController = {
    register: register,
    logIn: logIn
}

module.exports = authController;