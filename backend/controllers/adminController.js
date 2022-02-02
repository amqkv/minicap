const User = require('../models/user');

//Update role of a user
function updateRole(req, res) {
  if (req.body.newRole === req.body.oldRole) {
    res.status(200);
  } else {
    User.update(
      {
        Role: req.body.newRole,
      },
      {
        where: {
          AccountId: req.body.accountId,
        },
      }
    )
      .then((result) => {
        console.log('Role successfully updated !');
        res.status(200).send('Role successfully updated !');
      })
      .catch((err) => {
        res.status(500).send('Error:' + err);
      });
  }
}

module.exports = {
  updateRole,
};
