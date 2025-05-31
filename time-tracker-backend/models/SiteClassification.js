const mongoose = require("mongoose");

const SiteClassificationSchema = new mongoose.Schema({
  domain: { type: String, unique: true },
  classification: {
    type: String,
    enum: ["Productive", "Unproductive", "Neutral"],
    default: "Neutral"
  }
});

module.exports = mongoose.model("SiteClassification", SiteClassificationSchema);
