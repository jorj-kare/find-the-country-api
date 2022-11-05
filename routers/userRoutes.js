const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/signup/").post(userController.createNewUser);
module.exports = router;
