const express = require("express");
const indexRouter = require('./routes/index.js');
const charispayRouter = require('./routes/charispay.js');
const neobankRouter = require('./routes/neobank.js');
const discrepancyRouter = require('./routes/discrepancy.js');
const winston = require('winston');
const port = process.env.PORT || 3000;
const app = express();


const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});

function errorHandler(err, req, res, next) {
  logger.error(err);
    res.status(500).send({
      error: {
        message: err.message,
        stack: err.stack
      }});
  
    console.log(err)
  
    res.json({error: err.message});
  }

app.use('/', indexRouter);
app.use('/charispay', charispayRouter);
app.use('/neobank', neobankRouter);
app.use('/discrepancy', discrepancyRouter);
app.use(express.json());
app.use(errorHandler);

app.listen(port);

module.exports = app;
