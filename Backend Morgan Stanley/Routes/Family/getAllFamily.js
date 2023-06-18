const route = require("express").Router();
const Family = require("../../model/familySchema");

route.post("/", async (req, res) => {
  try {
    const familyData = await Family.find({ community: req.body.community }); // Retrieve all staff data
    res.json(familyData);
    console.log("Family data retrieved");
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    res.status(500).json({ error: error });
  }
});

exports = module.exports = {
  getAllFamily: route,
};
