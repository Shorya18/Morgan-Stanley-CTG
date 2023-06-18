const mongoose = require("mongoose");

// Schema for User's Documents
const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  idNo: {
    type: String,
    required: true,
  },
  // type: {
  //   type: String,
  //   required: true,
  // },
  dateOfIssue: {
    type: String,
    required: true,
  },
  dateOfExpiry: {
    type: String,
    required: true,
  },
});

// Schema for Medical History
const medicalHistorySchema = new mongoose.Schema({
  lastMedicalCheckup: {
    type: Date,
    required: true,
  },
  healthIssues: [
    {
      type: String,
    },
  ],
});

// Schema for User
const userDetailSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobNo: {
    type: String,
  },
  adharCheck: {
    type: Boolean,
    default: false,
    required: true,
  },
  adharCard: {
    type: String,
  },
  gender: {
    type: String,
  },
  community: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  age: {
    type: Number,
    min: 0,
  },

  income: {
    type: String,
  },

  education: {
    type: String,
  },
  MPIscore: {
    type: Number,
    min: 0,
    default: 1,
  },
  helpNeeded: [
    {
      type: String,
    },
  ],
  documents: [documentSchema],
  familyId: {
    type: String,
  },

  medicalHistory: [medicalHistorySchema],
  employmentStatus: {
    type: String,
  },

  createDate: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const UserDetail = mongoose.model("UserDetail", userDetailSchema);

module.exports = UserDetail;
