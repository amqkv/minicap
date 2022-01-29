const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authJwt = require('../middleware/authJwt');

router.use(express.json());

//Get the authenticated user
router.get('/getUser', authJwt.verifyToken, (req, res) => {
  User.findOne({
    where: {
      email: req.user.email,
    },
  })
    .then((user) => {
      console.log(user);
      res.json(user);
    })
    .catch((err) => console.log(err));
});

router.get('/role', userController.getAllRoles);

//Register
router.post('/register', (req, res) => {
  //Verifies if email has already been used
  User.findOne({
    where: {
      Email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: 'Email already used for another user',
      });
    } else {
      authController.register(req, res);
    }
  });
});

//Login
router.post('/login', (req, res) => {
  authController.logIn(req, res);
});

module.exports = {
  router: router,
};
