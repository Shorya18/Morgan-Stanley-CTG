const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user_Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", user_Schema);

module.exports = User;
