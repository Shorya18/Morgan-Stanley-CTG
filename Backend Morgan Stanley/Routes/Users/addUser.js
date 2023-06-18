const route = require('express').Router()
const User = require("../../model/userSchema");

//Add User to dataBase
route.post("/", async (req, res) => {
    const user = {
        name: req.body.name,
        phoneNo: req.body.phoneNo,
    };

    const existingUser = await User.findOne(user);
    try {
        if (existingUser) {
        console.log("User logged in:", existingUser);
        res.send("User Logged In");
        } else {
        // Creating a new User object
        const newUser = new User(user);

        // Saving the user information
        const savedUser = await newUser.save();
        console.log("User registered:", savedUser);
        res.send("new User Registered");
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("User was not registered , some error occured");
    }
});

exports = module.exports = {
    UserAdd: route
}