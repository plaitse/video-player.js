const mongoose = require("mongoose");

const HistorySchema = mongoose.Schema({
  videoUrl: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("History", HistorySchema);
