const mongoose = require("mongoose");

const pointTableSch = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  points: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("PointsTable", pointTableSch);
