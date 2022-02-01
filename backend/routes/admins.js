const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
const adminController = require('../controllers/adminController');
const constants = require('../utils/constants');

router.use(express.json());
router.use(authUser.setUser);

//Admin test page
router.get(
  '/',
  authUser.verifyUser,
  authUser.verifyRole(constants.ROLE.ADMIN),
  (req, res) => {
    res.send('If you can access this then you are an admin !');
  }
);

//Update user roles as admin
//TODO Fix route, 403 status code
router.patch(
  '/update-role',
  authUser.verifyUser,
  authUser.verifyRole(constants.ROLE.ADMIN),
  (req, res) => {
    adminController.updateRole(req, res);
  }
);

module.exports = {
  router: router,
};
