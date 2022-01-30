const User = require("../models/user");

//Update role of a user
function updateRole(req, res) {
    User.update({
        Role: req.body.role
    }, {
        where: {
            Email: req.body.email
        }
    }).then(result => {
        console.log("Role successfully updated !");
        res.json("Role succesfully updated !");
    }).catch(err => {
        res.status(500).send("Error:"+err);
    })
}

module.exports = {
    updateRole
};