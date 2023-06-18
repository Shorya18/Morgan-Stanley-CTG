const route = require("express").Router();
const Program = require("../../model/programSchema");

route.post("/", async (req, res) => {
  try {
    const { name, startDate, description } = req.body;
    const program = new Program({
      name,
      startDate,
      description,
    });

    const newProgram = await program.save();

    res.status(200).json({ success: true, program: newProgram });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to add program" });
  }
});

exports = module.exports = {
  CommunityAdd: route,
};
