const express = require("express");
const countryController = require("../controllers/mainController");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/").get(countryController.getAllCountries);
router.route("/continent/:continent").get(countryController.getContinent);
router.route("/country/:code3").get(countryController.getCountry);

router.use(userController.protect);
router.use(userController.restrictToAdmin);
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
router.delete(countryController.deleteAllCountries);
module.exports = router;
