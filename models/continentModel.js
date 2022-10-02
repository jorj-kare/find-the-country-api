const mongoose = require("mongoose");

const continentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  centroids: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
  },
  zoomLevel: { type: Number },
  countries: {
    type: {
      type: String,
      require: true,
      default: "FeatureCollection",
      enum: ["FeatureCollection"],
    },
    features: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Country",
      },
    ],
  },
});

const Continent = mongoose.model("Continent", continentSchema);

module.exports = Continent;
