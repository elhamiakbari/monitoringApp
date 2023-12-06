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
        else 
        {
            executeStatement().then(res=>{
                resolve(res);
            }).catch(error=>{
                reject(error);
            })
        }
    });

    connection.connect();

    function executeStatement () {
        return new Promise((resolve, reject) => {
        var request = new Request(queryPrompt, (err, rowCount) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                return response;
            }
            connection.close()
        })
    
        request.on('row', (columns) => {
            response = JSON.stringify(columns);
            resolve(JSON.stringify(columns));
            // columns.forEach((column) => {
            //     if (column.value === null) {
            //         console.log('NULL')
            //     } else {
            //         console.log(column.value)
            //     }
            // })
        })
    
        connection.execSql(request);
        })
}

    // function createConnection() {
    //     return sql.createConnection({
    //         server: globalConfig.sql_config[dbName].host,
    //         user: globalConfig.sql_config[dbName].user,
    //         password: globalConfig.sql_config[dbName].password,
    //         database: config.sql_config[dbName].database,
    //         port: config.sql_config[dbName].port,
    //         insecureAuth: true,
    //         bigNumberStrings: true,
    //         supportBigNumbers: true,
    //         connectionLimit: 10,
    //     })
    //   };
      
    // return new Promise((resolve, reject) => {
    //     const connection = createConnection();
    //     connection.connect(err => {
    //         console.log(err);
    //     });
    
    //     console.log(query);
    //     connection.query(query,(error, results) => {
    //       if (error) {
    //         reject(error);
    //       } else {
    //         resolve(results);
    //       }
    //     });
    
    //     connection.end();
    // });    
  }
)}
}

module.exports = SqlService;