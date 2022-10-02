const express = require("express");
const countryController = require("../controllers/mainController");

const router = express.Router();
router.delete(countryController.deleteAllCountries);

router
  .route("/editCountryData/:continent")
  .post(countryController.createCountry);

router
  .route("/editContinentData")
  .post(countryController.createContinent)
  .delete(countryController.deleteAllContinents);
router
  .route("/editContinentData/:continent")
  .patch(countryController.updateContinent);

router.route("/").get(countryController.getAllCountries);
router.route("/continent/:continent").get(countryController.getContinent);
router.route("/country/:id").get(countryController.getCountry);
module.exports = router;
