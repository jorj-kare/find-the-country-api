const express = require("express");
const { renderOverview } = require("../controllers/viewController");

const router = express.Router();

router.route("/").get(renderOverview);
module.exports = router;
