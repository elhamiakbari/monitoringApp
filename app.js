const express = require("express");
const indexRouter = require('./routes/index.js');
const charispayRouter = require('./routes/charispay.js');
const port= 3000;
const app = express();
//const server = https.createServer(app);
//const socketio = require('https://neoapi.charisma.ir')(server, {
//   serveClient: config.env !== 'production',
//   path: '/api/monitoring',
// });

function errorHandler(err, req, res, next) {
    res.status(500);
  
    console.log(err)
  
    res.json({error: err.message});
  }

app.use('/', indexRouter);
app.use('/charispay', charispayRouter);
app.use(express.json());
app.use(errorHandler);

app.listen(port);

module.exports = app;
