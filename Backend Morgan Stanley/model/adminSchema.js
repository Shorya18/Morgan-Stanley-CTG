const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin_Sch = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", Admin_Sch);

module.exports = Admin;
