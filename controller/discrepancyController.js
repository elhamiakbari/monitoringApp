const express = require("express");
const app = require("../app");
const request = require('../service/RequestService');
const config = require("../config.json");
const SqlService= require("../service/SqlService");
const jalali = require('jalali-moment')
const billAPIQuery = require("../SqlQueries/discrepencyQueries/billAPIQuery");


let now = jalali().locale('en');
exports.discrepancyController = async (req, res) => {
    const route = req.route.path;
    var fromDate = new Date();
    var toDate = new Date();
    const searchUrl= config.elastic_base_url +config.elastic_index_name.charispay + "/_search?sort=@timestamp:desc&_source_includes=@timestamp,_id,level,HttpData";
    switch (route) { 
      case '/bill-api':
        var toDate = now.format('YYYY-M-DTHH:mm:ss');
        fromDate = now.format('YYYY-M-DT00:00:00');
        const query = billAPIQuery(config.sql_config.charispay.database,fromDate,toDate);
         SqlService.query('charispay',query).then(response => {
          res.send((response));
        });
      break;
    }
  };
