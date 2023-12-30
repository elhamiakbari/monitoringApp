const express = require("express");
const app = require("../app");
const request = require('../service/RequestService');
const config = require("../config.json");
const SqlService= require("../service/SqlService");
const connectionErrorsRequest = require("../ELKRequests/charispayElasticRequests/connectionErrorsRequest");
const errorHandledRequest = require("../ELKRequests/charispayElasticRequests/errorHandledRequest");
const unhandledErrorRequest = require("../ELKRequests/charispayElasticRequests/unhandledErrorRequest");
const jalali = require('jalali-moment')
const connectionErrorsResponse = require('../response/charispay/connectionErrorResponse');

const companyTransactionQuery =require("../SqlQueries/charispayQueries/companiesTransactionsQuery")

const connectionErrorResponse = require('../response/charispay/connectionErrorResponse');
const errorHandledResponse = require('../response/charispay/errorHandledResponse');
const unhandledErrorResponse = require('../response/charispay/unhandledErrorResponse');

const transactionsStatus = require("../SqlQueries/charispayQueries/transactionsStatus");
const errorsInSendToBank = require("../SqlQueries/charispayQueries/errorsInSendToBank");
const companiesCheques = require("../SqlQueries/charispayQueries/companiesCheques");

let now = jalali().locale('en');
exports.charispayController = async (req, res) => {
    const route = req.route.path;
    var fromDate = new Date().toISOString();
    var toDate = new Date().toISOString();
    const searchUrl= config.elastic_base_url +config.elastic_index_name.charispay + "/_search?sort=@timestamp:desc&_source_includes=@timestamp,_id,level,HttpData";
    switch (route) { 
      case '/companies-daily-transactions':
        const query = companyTransactionQuery(config.sql_config.charispay.database);
         SqlService.query('charispay',query).then(response => {
          res.send((response));
        });
      break;

      case '/transactions-status':
        const date = [0,-1,-2,-3];
        const test = [];
        for (let i=0; i < date.length; i++) {
          const Query = transactionsStatus(config.sql_config.charispay.database,date[i]);
          let result = await SqlService.query('charispay',Query);
          test.push(result);
          console.log(result);
        };  
        console.log(test);
          res.send((test));
        break;

        case '/errors-in-send-to-bank':
          let Query = errorsInSendToBank(config.sql_config.charispay.database);
          SqlService.query('charispay',Query).then(response => {
            res.send((response));
          });
          
          break;

          case '/companies-cheques':
            let QUERY = companiesCheques(config.sql_config.charispay.database);
            SqlService.query('charispay',QUERY).then(response => {
              res.send((response));
            });
            
            break;

      // case '/connection-errors':
      //    fromDate = req.query.from_date;
      //    toDate = req.query.to_date;
      //     const requestBody = connectionErrorsRequest(fromDate,toDate);
      //     const serviceResponse = await request.post(searchUrl,requestBody.requestBody);
      //     let responseData= serviceResponse.aggregations[0].buckets;
      //     let connectionErrorStats= connectionErrorsResponse;
      //     for(let i = 0; i<responseData.length; i++){
      //       connectionErrorStats[responseData[i].key]= responseData[i].doc_count;
      //     }
          
      //     res.send(connectionErrorStats);
      // break;

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

      case '/error-handled':
        toDate = new Date();
        fromDate = new Date();
        fromDate.setHours(0,0,0);
        const requestBody =  errorHandledRequest(fromDate,toDate);
        const serviceResponse= await request.post(searchUrl,requestBody.requestBody);
        let responseData= serviceResponse.aggregations[0].buckets;
        let errorHandledStats= errorHandledResponse;
        for(let i = 0; i<responseData.length; i++){
        errorHandledStats[responseData[i].key_as_string]= responseData[i].doc_count
        }
        res.send(errorHandledStats);
      break;

      case '/unhandled-error':
        var toDate = now.format('YYYY-M-DTHH:mm:ss');
        fromDate = now.format('YYYY-M-DT00:00:00');
        const requestbody =  unhandledErrorRequest(fromDate,toDate);
        const serviceresponse= await request.post(searchUrl,requestbody.requestBody);
        let Responsedata= serviceresponse.aggregations[0].buckets;
        let unhandledErrorStats= unhandledErrorResponse;
        for(let i = 0; i<Responsedata.length; i++){
          unhandledErrorStats[Responsedata[i].key_as_string]= Responsedata[i].doc_count
        }
        res.send(unhandledErrorStats);
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

