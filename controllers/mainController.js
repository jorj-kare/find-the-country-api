const Country = require("../models/countryModel");
const Continent = require("../models/continentModel");
const catchAsync = require("../utils/catchAsync");
const { getData, getContinentData } = require("../data/getData");
const AppError = require("../utils/appError");

exports.createCountry = catchAsync(async (req, res, next) => {
  const data = getData(req.params.continent);
  const continent = await Continent.findOne({ name: req.params.continent });
  data.forEach((el) => {
    el.continent = continent._id;
  });
  const countries = await Country.create(...data);

  res.status(200).json({
    status: "success",
    data: {
      countries,
    },
  });
});

exports.updateCountry = catchAsync(async (req, res, next) => {
  const data = req.body;
  const countryData = data.filter(
    (c) => c.properties.ISO_A3 === req.params.countryCode3
  );

  const country = await Country.findOne({
    "properties.ISO_A3": req.params.countryCode3,
  });

  country.geometry.coordinates = countryData[0].geometry.coordinates;

  await country.save();
  res.status(201).json({
    status: "success",
    data: country,
  });
});
exports.updateCountries = catchAsync(async (req, res, next) => {
  const data = req.body;

  data.forEach(async (d) => {
    await Country.updateOne(
      { "properties.ISO_A3": d.properties.ISO_A3 },
      { "geometry.coordinates": d.geometry.coordinates }
    );
  });

  res.status(201).json({
    status: "success",
    data: "",
  });
});

exports.deleteAllCountries = catchAsync(async (req, res, next) => {
  await Country.deleteMany();
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createContinent = catchAsync(async (req, res, next) => {
  const data = getContinentData();
  const continents = await Continent.create(...data);
  res.status(200).json({
    status: "success",
    data: {
      continents,
    },
  });
});

exports.deleteAllContinents = catchAsync(async (req, res, next) => {
  await Continent.deleteMany();
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateContinent = catchAsync(async (req, res, next) => {
  const continent = await Continent.findOne({ name: req.params.continent });
  const countries = await Country.find({
    continent: continent._id,
  });
  const countriesId = countries.map((el) => el._id);
  continent.countries.features = countriesId;
  await continent.save();

  res.status(201).json({
    status: "success",

    data: {
      continent,
    },
  });
});

exports.getAllCountries = catchAsync(async (req, res) => {
  const countries = await Country.find()
    .select("-geometry")
    .populate({ path: "continent", select: "name" })
    .explain();

  res.status(200).json({
    status: "success",
    data: {
      countries,
    },
  });
});

exports.getCountry = catchAsync(async (req, res, next) => {
  const country = await Country.findOne({
    "properties.ISO_A3": req.params.code3,
  });

  if (!country) return next(new AppError("No country with that code"));
  res.status(200).json({
    status: "success",
    data: {
      country,
    },
  });
});

exports.getContinent = catchAsync(async (req, res, next) => {
  const continent = await Continent.findOne({
    name: req.params.continent,
  }).populate({ path: "countries.features" });
  if (!continent)
    return next(new AppError("There is no continent with this name.", 400));
  res.status(200).json({
    status: "success",
    data: {
      continent,
    },
  });
});
