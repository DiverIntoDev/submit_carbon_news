const mongoose = require("mongoose");

const postSch = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  font: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Post", postSch);
