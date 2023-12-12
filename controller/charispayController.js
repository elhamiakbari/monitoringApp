const express = require("express");
const app = require("../app");
const connectionErrorsRequest = require("../ELKRequests/charispayElasticRequests/connectionErrorsRequest");
const request = require('../service/RequestService');
const connectionErrorsResponse = require('../response/charispay/connectionErrorResponse');
const config = require("../config.json");
const companyTransactionQuery =require("../SqlQueries/charispayQueries/companiesTransactionsQuery")
const SqlService= require("../service/SqlService");
const connectionErrorResponse = require("../response/charispay/connectionErrorResponse");

exports.charispayController = async (req, res) => {
    const route = req.route.path;
    var fromDate = new Date();
    var toDate = new Date();
    const searchUrl= config.elastic_base_url + "/_search?sort=@timestamp:desc&_source_includes=@timestamp,_id,level,HttpData";
    switch (route) { 
      case '/companies-daily-transactions':
        const query = companyTransactionQuery(config.sql_config.charispay.database);
         SqlService.query('charispay',query).then(response => {
          res.send((response));
        });
      break;

      case '/connection-errors':
         fromDate = req.query.from_date;
         toDate = req.query.to_date;
          const requestBody = connectionErrorsRequest(fromDate,toDate);
          const serviceResponse = await request.post(searchUrl,requestBody.requestBody);
          let responseData= serviceResponse.aggregations[0].buckets
          let connectionErrorStats= connectionErrorsResponse;
          for(let i = 0; i<responseData.length; i++){
            connectionErrorStats[responseData[i].key]= responseData[i].doc_count;
          }
          
          res.send(connectionErrorStats);
      break;

        
      case '/last-hour-connection-errors':
             toDate = new Date();
             fromDate = new Date(toDate.getTime() - 3600000);
             const RequestBody = connectionErrorsRequest(fromDate,toDate);
            const serviceResponseLastHour = await request.post(searchUrl,RequestBody.requestBody);
            let responsedata= serviceResponseLastHour.aggregations[0].buckets;
            let connectionErrorsLastHourStats= connectionErrorResponse;
            for(let i = 0; i<responsedata.length; i++){
             connectionErrorsLastHourStats[responsedata[i].key]= responsedata[i].doc_count;
          }
            res.send(connectionErrorsLastHourStats);
      break;

       case '/today-connection-errors':
             toDate = new Date();
             fromDate = new Date();
             fromDate.setHours(0,0,0);
            const RequestBody2 =  connectionErrorsRequest(fromDate,toDate);
            const serviceResponseToday= await request.post(searchUrl,RequestBody2.requestBody);
            let ResponseData= serviceResponseToday.aggregations[0].buckets;
            let connectionErrorsTodayStats= connectionErrorResponse;
            for(let i = 0; i<ResponseData.length; i++){
             connectionErrorsTodayStats[ResponseData[i].key]= ResponseData[i].doc_count
          }
            res.send(connectionErrorsTodayStats);
      break;

      case '/handled-exceptions':

          // Logic for handling another route
          res.send(`handled-exceptions ${fromDate}`);
      break;
      case '/unhandled-exceptions':
            // Logic for handling another route
            res.send('unhandled-exceptions');
      break;
      default:
          // Logic for handling any other routes
          res.send('Handling unknown route');
      break;
    }
  };