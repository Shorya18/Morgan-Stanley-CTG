const route = require('express').Router()
const Staff = require("../../model/staffSchema");


// to login into admin account
route.post("/", async (req, res) => {
    const StaffDetails = {
        name: req.body.name,
        AdharCard_No: req.body.AdharCard_No,
        Date_of_Birth: req.body.Date_of_Birth,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        Role: req.body.Role,
        Experience: req.body.Experience,
        Assigned_Community: req.body.Assigned_Community,
    };
    // console.log(adminDetails);

    const ExistingStaff = await Staff.findOne({ AdharCard_No: StaffDetails.AdharCard_No });
    try {
        if (ExistingStaff) {
            if(ExistingStaff.Flag == false) {
                ExistingStaff.Flag = true;
                await ExistingStaff.save();
                console.log("Staff Registered");
                res.send("new Staff Registered");
            }
            else {
                console.log(`User With this ${StaffDetails.AdharCard_No} Already Existes`);
                res.send(`User With this ${StaffDetails.AdharCard_No} Already Existes`);
            }
        } else {
        // Creating a new User object

        const newStaffMember = new Staff(StaffDetails);

        // Saving the user information
        const savedStaff = await newStaffMember.save();
        console.log("Staff Registered");
        res.send("new Staff Registered");
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("Staff was not registered , some error occured");
    }
  });

exports = module.exports = {
    staffAdd: route
}