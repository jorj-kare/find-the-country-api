const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/signup/").post(userController.createNewUser);
router.route("/login").post(userController.login);
router.use(userController.protect);
router.use(userController.restrictToAdmin);
router.route("/deleteMyAccount").delete(userController.deleteMyAccount);
module.exports = router;
