const express = require("express");
const indexRouter = require('./routes/index.js');
const charispayRouter = require('./routes/charispay.js');
const neobankRouter = require('./routes/neobank.js');
const port= 3000;
const app = express();


function errorHandler(err, req, res, next) {
    res.status(500);
  
    console.log(err)
  
    res.json({error: err.message});
  }

app.use('/', indexRouter);
app.use('/charispay', charispayRouter);
app.use('/neobank', neobankRouter);
app.use(express.json());
app.use(errorHandler);

app.listen(port);

module.exports = app;
