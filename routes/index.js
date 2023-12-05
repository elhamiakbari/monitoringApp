const express = require("express");
const router = express.Router();




router.get("/waiting-for-activation-users");

router.get("/registered-users");


// router.post("/daily-transactions", (req,res)=>{
//   const fromDate = Date(req.body.fromDate); 
//   const toDate = Date(req.body.toDate); 
//   res.send('Body- ' + JSON.stringify(req.body)); 
// });



// router.get('/cpg', (req,res)=>{
//   res.render("../views/CPG.jade");
// });

// router.get('*', (req,res)=>{
//   res.send("NOT FOUND 404!");
// });

module.exports = router;