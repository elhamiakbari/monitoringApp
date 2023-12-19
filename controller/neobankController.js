const express = require("express");
const app = require("../app");
const dailyErrorsRequest = require("../ELKRequests/neobankElasticRequests/dailyErrorsRequest");
const config = require("../config.json");
const request = require('../service/RequestService');


exports.neobankController = async (req, res) => {
  const route = req.route.path;
  var fromDate = new Date();
  var toDate = new Date();
  const searchUrl= config.elastic_base_url +config.elastic_index_name.neobank+ "/_search?sort=@timestamp:desc&_source_includes=@timestamp,_id,level,HttpData";
  switch (route) { 
    case '/daily-errors':
      toDate = new Date();
      fromDate = new Date(toDate.getTime() - 3600000);
      const RequestBody = dailyErrorsRequest(fromDate,toDate);
     const dailyErrorsResponse = await request.post(searchUrl,RequestBody.requestBody);
     let responsedata= dailyErrorsResponse.hits.total;
     
     res.send(responsedata);
    break;

    
  }
};
