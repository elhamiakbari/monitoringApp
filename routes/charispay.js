const express = require("express");
const router = express.Router();
const {charispayController} = require("../controller/charispayController");

// router.get("/register", (req,res)=>{
//     res.send("Register Form:");
// });

// router.post("/register", (req,res)=>{
//     req.body = {
//         fromDate: "2023-11-19T00:00:00.745Z",
//         toDate: "2023-11-22T23:59:59.745Z"
//       };
// res.send("Your Register Was Successfuly!");
// });

router.get("/connection-errors", charispayController);
router.get("/handled-exceptions", charispayController);
router.get("/unhandled-exceptions/:from_date/:to_date", charispayController);


module.exports = router;