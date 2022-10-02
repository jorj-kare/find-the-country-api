const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Feature",
  },
  properties: {
    ADMIN: { type: String },
    ISO_A3: { type: String },
  },
  geometry: {
    type: { type: String, default: "MultiPolygon" },
    coordinates: { type: [[[[Number]]]] },
  },
  continent: {
    type: mongoose.Schema.ObjectId,
    ref: "Continent",
  },
});
countrySchema.index({ coordinates: "2dsphere" });
const Country = mongoose.model("Country", countrySchema);
module.exports = Country;
