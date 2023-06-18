const route = require("express").Router();
const User = require("../../model/userDetailsSchema");

route.get("/", async (req, res) => {
  try {
    const UserData = await User.find(); // Retrieve all staff data
    res.json(UserData);
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    res.status(500).json({ error: "Failed to retrieve staff data" });
  }
});

exports = module.exports = {
  UserDetails: route,
};
