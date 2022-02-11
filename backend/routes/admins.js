const express = require('express');
const router = express.Router();
const authUser = require('../middleware/auth-user');
const adminController = require('../controllers/admin-controller');
const constants = require('../utils/constants');

router.use(express.json());
router.use(authUser.setUser);

//Admin test page
router.get('/', authUser.verifyUser, authUser.verifyRole(constants.ROLE.ADMIN), (req, res) => {
  res.send('If you can access this then you are an admin !');
});

//Update user roles as admin
router.patch('/update-role', authUser.verifyUser, authUser.verifyRole(constants.ROLE.ADMIN), (req, res) => {
  adminController.updateRole(req, res);
});

//Assign a patient to a doctor as admin
router.patch('/assign-patient-doctor', authUser.verifyUser, authUser.verifyRole(constants.ROLE.ADMIN), (req, res) => {
    adminController.assignPatientDoctor(req, res);
  }
);

module.exports = {
  router: router,
};
