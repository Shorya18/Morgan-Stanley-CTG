const route = require("express").Router();
const Program = require("../../model/programSchema");

// to login into admin account
route.get("/", async (req, res) => {
  // Retrieve all staff data
  try {
    const programData = await Program.find({ Flag: true }); // Retrieve all staff data
    res.json(programData);
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    res.status(500).json({ error: "Failed to retrieve Community data" });
  }
});

exports = module.exports = {
  CommunityDetails: route,
};
