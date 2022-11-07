const express = require("express");
const countryController = require("../controllers/mainController");

const router = express.Router();
router.delete(countryController.deleteAllCountries);

router.route("/createCountry/:continent").post(countryController.createCountry);
router
  .route("/updateCountryData/:countryCode3")
  .patch(countryController.updateCountry);
router.route("/updateCountriesData").patch(countryController.updateCountries);

router
  .route("/createContinent")
  .post(countryController.createContinent)
  .delete(countryController.deleteAllContinents);
router
  .route("/editContinentData/:continent")
  .patch(countryController.updateContinent);

router.route("/").get(countryController.getAllCountries);
router.route("/continent/:continent").get(countryController.getContinent);
router.route("/country/:code3").get(countryController.getCountry);
module.exports = router;
