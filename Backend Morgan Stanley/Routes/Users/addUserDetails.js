const route = require("express").Router();
const UserDetail = require("../../model/userDetailsSchema");

route.post("/", async (req, res) => {
  try {
    const userData = req.body;

    const existingUser = await UserDetail.findOne({
      userId: userData.userId,
    });

    if (existingUser) {
      existingUser = userData;

      await existingUser.save();

      res
        .status(200)
        .json({ message: "User detail data updated successfully" });
    } else {
      const newUser = new UserDetail(userData);
      await newUser.save();

      res.status(200).json({ message: "New user created successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to save or update user detail data" });
  }
});

exports = module.exports = {
  UserDetailsAdd: route,
};
