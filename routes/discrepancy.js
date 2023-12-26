const express = require("express");
const router = express.Router();
const {discrepancyController} = require("../controller/discrepancyController.js");
router.get("/bill-api", discrepancyController);

module.exports = router;
