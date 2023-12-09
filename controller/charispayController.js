const express = require("express");
const app = require("../app");
const connectionErrorsRequest = require("../ELKRequests/charispayElasticRequests/connectionErrorsRequest");
const request = require('../service/RequestService');
const connectionErrorsResponse = require('../response/charispay/connectionErrorResponse');
const config = require("../config.json");
const companyTransactionQuery =require("../SqlQueries/charispayQueries/companiesTransactionsQuery")
const SqlService= require("../service/SqlService")

exports.charispayController = async (req, res) => {
    const route = req.route.path;
    const fromDate = req.query.from_date;
    const toDate = req.query.to_date;
    const searchUrl= config.elastic_base_url + "/_search?sort=@timestamp:desc&_source_includes=@timestamp,_id,level,HttpData";
    switch (route) {
      case '/companies-daily-transactions':
        const query = companyTransactionQuery(config.sql_config.charispay.database);
         SqlService.query('charispay',query).then(response => {
          res.send((response));
        });
      break;
        
        res.send(connectionErrorStats);
        break;
        case '/connection-errors':
          // Logic for handling the "connection-errors" route
          const requestBody = connectionErrorsRequest(fromDate,toDate);
          const serviceResponse = await request.post(searchUrl,requestBody.requestBody);
          let responseData= serviceResponse.aggregations[0].buckets
          let connectionErrorStats= connectionErrorsResponse;
          for(let i = 0; i<responseData.length; i++){
            connectionErrorStats[responseData[i].key]= responseData[i].doc_count
          }
          
          res.send(connectionErrorStats);
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