const User = require('../models/user');

//Update role of a user
function updateRole(req, res) {
  console.log(req.body);

  if (req.body.NewRole == req.body.OldRole) {
    res.status(200);
  } else {
    User.update(
      {
        Role: req.body.NewRole,
      },
      {
        where: {
          AccountId: req.body.AccountId,
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
