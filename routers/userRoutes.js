const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/signup/").post(userController.createNewUser);
router.route("/deleteMyAccount").delete(userController.deleteMyAccount);
module.exports = router;
