const route = require("express").Router();
const Staff = require("../../model/EventSchema");

// to login into admin account
route.get("/", async (req, res) => {
  // Retrieve all staff data
  try {
    const staffData = await Staff.find({ Flag: false }); // Retrieve all staff data
    res.json(staffData);
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    res.status(500).json({ error: "Failed to retrieve Event data" });
  }
});

exports = module.exports = {
  EventDetailsInactive: route,
};
