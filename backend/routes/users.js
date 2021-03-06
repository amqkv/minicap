const express = require("express");

const router = express.Router();
const User = require("../models/user");
const authController = require("../controllers/auth-controller");
const userController = require("../controllers/user-controller");
const authJwt = require("../middleware/auth-jwt");

router.use(express.json());

// Get the authenticated user
router.get("/getUser", authJwt.verifyToken, (req, res) => {
    authController.getAuthUser(req, res);
});

// Fetches all users, organized in an array by roles. { Role: [{Account1},{Account2}], Role2: [], ... }
router.get("/role", userController.getAllUserRoles);

// Fetches all pending users
router.get("/pending", userController.getPendingUsers);

// Register
router.post("/register", (req, res) => {
    // Verifies if email has already been used
    User.findOne({
        where: {
            Email: req.body.email,
        },
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Email already used for another user",
            });
        } else {
            authController.register(req, res);
        }
    });
});

// Login
router.post("/login", (req, res) => {
    authController.logIn(req, res);
});

module.exports = {
    router,
};
