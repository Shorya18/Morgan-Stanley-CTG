const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Nitin patel

/*
  nameOfActivity
  startDate
  endDate
  venue
  address of event
  Active
  theme
  description
  capacity
  invitedCommunity
  assignedStaff
  Register
  Flag
*/

const activity_schema = new Schema(
  {
    nameOfActivity: {
      type: String,
      require: true,
    },
    startDate: {
      type: Date,
      require: true,
    },
    endDate: {
      type: Date,
      require: true,
    },
    startTime: {
      type: "string",
      default: "00:00",
    },
    duration: {
      type: "Number",
      default: 0,
    },
    venue: {
      type: String,
      require: true,
    },
    theme: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    capacity: {
      type: Number,
      require: true,
    },
    invitedCommunity: {
      type: [String],
    },
    assignedStaff: {
      type: [String],
    },
    Register: {
      type: [String],
      default: [],
    },
    Flag: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activity_schema);

module.exports = Activity;