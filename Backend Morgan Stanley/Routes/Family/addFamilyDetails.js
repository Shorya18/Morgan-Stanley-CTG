const route = require("express").Router();
const Family = require("../../model/familySchema");
const Community = require("../../model/programSchema");
const mongoose = require("mongoose");

// POST /family/add
route.post("/", async (req, res) => {
  try {
    const {
      familyId,
      community,
      MPIscore,
      members,
      cookingFuel,
      sanitation,
      drinkingWater,
      electricity,
      house,
      assets,
    } = req.body;

    const existingFamily = await Family.findOne({ familyId });

    if (existingFamily) {
      // Update the existing family
      existingFamily.cookingFuel = cookingFuel;
      existingFamily.sanitation = sanitation;
      existingFamily.drinkingWater = drinkingWater;
      existingFamily.electricity = electricity;
      existingFamily.house = house;
      existingFamily.assets = assets;

      const updatedFamily = await existingFamily.save();
      res.json(updatedFamily);
    } else {
      // Create a new family
      const newFamily = new Family({
        familyId,
        community,
        MPIscore,
        members,
        cookingFuel,
        sanitation,
        drinkingWater,
        electricity,
        house,
        assets,
      });

      const savedFamily = await newFamily.save();
      res.json(savedFamily);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding/updating the family." });
  }
});

exports = module.exports = {
  addFamilyDetails: route,
};
