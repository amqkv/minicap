const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authUser = require('../middleware/authUser');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const authJwt = require('../middleware/authJwt');

router.use(express.json());
router.use(authUser.setUser);

//Admin test page
router.get('/', authUser.verifyUser, authUser.verifyRole(authUser.ROLE.ADMIN), (req, res) => {
    res.send("If you can access this then you are an admin !");
});

// Update user roles as admin
router.put('/updateRole', authUser.verifyUser, authUser.verifyRole(authUser.ROLE.ADMIN), (req, res) => {
    adminController.updateRole(req,res);
})

module.exports = {
    router: router
};