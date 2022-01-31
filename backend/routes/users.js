const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');
const authJwt = require('../middleware/authJwt');

router.use(express.json());

//Get the authenticated user
router.get('/getUser', authJwt.verifyToken, (req, res) => {
  authController.getAuthUser(req, res);
});

router.get('/role', userController.getAllRoles);
router.post('/role', adminController.updateRole);

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
