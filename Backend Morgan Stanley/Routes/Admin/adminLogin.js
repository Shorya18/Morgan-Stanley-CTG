const route = require("express").Router();
const Admin = require("../../model/adminSchema");
const bcrypt = require("bcryptjs");

// to login into admin account
route.post("/", async (req, res) => {
  const adminDetails = {
    email: req.body.username,
    password: req.body.password,
  };
  console.log(adminDetails);

  const founduser = await Admin.findOne({ email: adminDetails.email });
  // console.log(founduser);

  if (founduser) {
    bcrypt.compare(
      adminDetails.password,
      founduser.password,
      function (err, isMatch) {
        if (err) {
          throw err;
        } else if (isMatch) {
          console.log("authentication successful");
          res.send("authentication successful");
        } else {
          console.log("wrong password entered");
          res.send("wrong password entered");
        }
      }
    );
  } else {
    res.status(400).send("user not found");
  }
});

exports = module.exports = {
  adminLogin: route,
};
