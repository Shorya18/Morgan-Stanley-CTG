const route = require("express").Router();
const Staff = require("../../model/staffSchema");

route.get("/", async (req, res) => {
  try {
    const uniqueStaff = await Staff.distinct("name");
    res.json(uniqueStaff);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

exports = module.exports = {
  uniqueStaff: route,
};
