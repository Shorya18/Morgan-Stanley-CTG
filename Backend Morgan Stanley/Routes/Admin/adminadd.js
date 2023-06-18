const route = require("express").Router();
const bcrypt = require("bcryptjs");
const admin_data = require("../../model/adminSchema.js");

// to login into admin account
route.post("/", async (req, res) => {
  const adminDetails = {
    email: req.body.email,
    password: req.body.password,
  };
  // console.log(adminDetails);

  const Admin_Exist = await admin_data.findOne({ email: adminDetails.email });
  try {
    if (Admin_Exist) {
      await Admin_Exist.save();
      console.log("Admin_Exist");
      res.send("Admin_Exist");
    } else {
      // Creating a new User object

      const newStaffMember = new admin_data(adminDetails);

      const password = newStaffMember.password;
      const saltRounds = 10;

      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          throw err;
        } else {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
              throw err;
            } else {
              console.log(hash);
              newStaffMember.password = hash;
              newStaffMember.save();
            }
          });
        }
      });

      // Saving the user information
      console.log("AdminAdded");
      res.send("Admin Added");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Event was not registered , some error occured");
  }
});

exports = module.exports = {
  adminadd: route,
};
