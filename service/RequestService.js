const http = require('http');
const config = require("../config.json");

class RequestService {
  static get(url, params) {
    return new Promise((resolve, reject) => {
      const queryParams = new URLSearchParams(params).toString();
      const requestUrl = `${url}?${queryParams}`;

      http.get(requestUrl, (response) => {
        let responseData = '';

        response.on('data', (chunk) => {
          responseData += chunk;
        });

        response.on('end', () => {
          resolve(JSON.parse(responseData));
        });
      }).on('error', (error) => {
        reject(new Error(`GET request failed: ${error.message}`));
      });
    });
  }

  static post(url, data) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${config.elastic_encrypted_auth}`
      },
    };
    return new Promise((resolve, reject) => {
      const request = http.request(url, options, (response) => {
        
        let responseData = '';
    
        response.on('data', (chunk) => {
          responseData += chunk;
        });

        response.on('end', () => {
          resolve(JSON.parse(responseData));
        });
      });

      request.on('error', (error) => {
        reject(new Error(`POST request failed: ${error.message}`));
      });

      request.write(JSON.stringify(data));
      request.end();
    });
  }
}

module.exports = RequestService;