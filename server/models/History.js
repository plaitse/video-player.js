const mongoose = require("mongoose");

const HistorySchema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("History", HistorySchema);
