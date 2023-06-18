const route = require("express").Router();
const Staff = require("../../model/staffSchema");

// to login into admin account
route.post("/", async (req, res) => {
  const StaffDetails = {
    AdharCard_No: req.body.AdharCard_No,
  };
  // console.log(adminDetails);

  const ExistingStaff = await Staff.findOne({
    AdharCard_No: StaffDetails.AdharCard_No,
    Flag: true,
  });
  try {
    if (ExistingStaff) {
      ExistingStaff.Flag = false;
      await ExistingStaff.save();
      console.log("Staff Deleted");
      res.send("Staff Deleted");
    } else {
      // Creating a new User object
      console.log("Staff Does Not Exist");
      res.send("Staff Does Not Exist");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Staff was not Delete , some error occured");
  }
});

exports = module.exports = {
  staffDelete: route,
};
