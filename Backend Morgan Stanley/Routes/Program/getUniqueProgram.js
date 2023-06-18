const route = require("express").Router();
const Program = require("../../model/programSchema");

route.get("/", async (req, res) => {
  try {
    const uniqueCommunities = await Program.distinct("name");
    res.json(uniqueCommunities);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

exports = module.exports = {
  uniqueCommunities: route,
};
