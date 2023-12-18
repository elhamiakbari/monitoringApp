const express = require("express");
const router = express.Router();
const {neobankController} = require("../controller/neobankController");


router.get("/daily-errors", neobankController);


module.exports = router;