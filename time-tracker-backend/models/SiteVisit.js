const mongoose = require("mongoose");

const SiteVisitSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  domain: { type: String, required: true },
  duration: { type: Number, required: true }, // in milliseconds
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SiteVisit", SiteVisitSchema);
