const route = require("express").Router();
const Staff = require("../../model/staffSchema");

// to login into admin account
route.get("/", async (req, res) => {
  // Retrieve all staff data
  try {
    const staffData = await Staff.find({ Flag: true }); // Retrieve all staff data
    res.json(staffData);
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    res.status(500).json({ error: "Failed to retrieve staff data" });
  }
});

exports = module.exports = {
  staffDetails: route,
};
