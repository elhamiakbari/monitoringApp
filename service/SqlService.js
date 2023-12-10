// const mysql = require('mysql');
const globalConfig = require("../config.json");

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

class SqlService {

    static async query(dbName, queryPrompt) {
        return new Promise((resolve, reject) => {
            var response = [];
            const config = {
                server: globalConfig.sql_config[dbName].host,
                options: {
                    database: globalConfig.sql_config[dbName].database,
                    encrypt: true,
                    trustServerCertificate: true,
                },
                authentication: {
                    type: 'default',
                    options: {
                        userName: globalConfig.sql_config[dbName].user,
                        password: globalConfig.sql_config[dbName].password,
                    }
                }
            };

            const connection = new Connection(config);

            connection.on('connect', (err) => {
                if (err) {
                    reject(new Error(`POST request failed: ${err.message}`));
                }
                else {
                    executeStatement().then(res => {
                        resolve(res);
                    }).catch(error => {
                        reject(error);
                    })
                }
            });

            connection.connect();
            function convertToPascalCase(str) {
                const pascalCase = str.replace(/\w+/g, function (word) {
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }).replace(/\s+/g, '');

                return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
            }
            function executeStatement() {
                return new Promise((resolve, reject) => {
                    var request = new Request(queryPrompt, function(err) {
                        if (err) {
                            console.log(err)
                            reject(err)
                        } 
                    })

                    let responseArray = new Array();
                    request.on('row', (columns) => {
                        console.log('colu ',columns);
                        const test = columns.reduce((prevalue, currentValue)=>{
                            return {...prevalue, ...{[convertToPascalCase(currentValue.metadata.colName)]: currentValue.value}}
                        },{})
                        responseArray.push(test)                        
                    })
                    request.on('done', function(rowCount, more) {  
                        });  
                        
                        // Close the connection after the final event emitted by the request, after the callback passes
                        request.on("requestCompleted", function (rowCount, more) {
                            resolve(responseArray);
                            connection.close();
                        });

                    connection.execSql(request);
                })
            }

        }
        )
    }
}

module.exports = SqlService;