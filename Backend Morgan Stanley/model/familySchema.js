const { Timestamp } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mpiscore_schema = new Schema({
  date: {
    type: Date,
  },
  score: {
    type: Number,
    default: 1,
  },
});

const family_schema = new Schema({
  familyId: {
    type: String,
  },
  community: {
    type: String,
    required: true,
  },
  cookingFuel: {
    type: Boolean,
    default: false,
  },
  sanitation: {
    type: Boolean,
    default: false,
  },
  drinkingWater: {
    type: Boolean,
    default: false,
  },
  electricity: {
    type: Boolean,
    default: false,
  },
  house: {
    type: Boolean,
    default: false,
  },
  assets: {
    type: Boolean,
    default: false,
  },
  MPIscore: {
    type: [mpiscore_schema],
    default: [],
  },
  members: {
    type: [Schema.Types.ObjectId],
  },
});

const Family = mongoose.model("Family", family_schema);

module.exports = Family;
