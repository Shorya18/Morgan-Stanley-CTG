const route = require("express").Router();
const User = require("../../model/userDetailsSchema");

route.post("/", async (req, res) => {
  const com = req.body.community;

  try {
    const UserData = await User.find({ community: com }); // Retrieve all staff data
    res.json(UserData);
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    res.status(500).json({ error: "Failed to retrieve community user data" });
  }
});

exports = module.exports = {
  ProgramUserDetails: route,
};
