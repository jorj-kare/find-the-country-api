const express = require("express");
const countryController = require("../controllers/mainController");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/").get(countryController.getAllCountries);
router.route("/continent/:continent").get(countryController.getContinent);
router.route("/country/:code3").get(countryController.getCountry);

router.use(userController.protect);
router.use(userController.restrictToAdmin);
router.route("/country/:continent").post(countryController.createCountry);
router.route("/country/:code3").patch(countryController.updateCountry);
router
  .route("/countries")
  .patch(countryController.updateCountries)
  .delete(countryController.deleteAllCountries);

router
  .route("/continent/")
  .post(countryController.createContinents)
  .delete(countryController.deleteAllContinents);
router.route("/continent/:continent").patch(countryController.updateContinent);
module.exports = router;
