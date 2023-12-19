module.exports = (fromDate,toDate)=>{
    const requestBody= {
      "aggs": {},
      "size": 0,
      "fields": [
        {
          "field": "@timestamp",
          "format": "date_time"
        },
        {
          "field": "CallLog.CreationDate",
          "format": "date_time"
        },
        {
          "field": "CallLog.DataCallDate",
          "format": "date_time"
        },
        {
          "field": "CallLog.ExceptionDate",
          "format": "date_time"
        },
        {
          "field": "CallLog.RequestTime",
          "format": "date_time"
        },
        {
          "field": "CallLog.ResponseTime",
          "format": "date_time"
        },
        {
          "field": "CallLog.ServiceCallDate",
          "format": "date_time"
        },
        {
          "field": "now",
          "format": "date_time"
        }
      ],
      "script_fields": {},
      "stored_fields": [
        "*"
      ],
      "runtime_mappings": {},
      "_source": {
        "excludes": []
      },
      "query": {
        "bool": {
          "must": [],
          "filter": [
            {
              "bool": {
                "should": [
                  {
                    "term": {
                      "level.keyword": {
                        "value": "Error"
                      }
                    }
                  }
                ],
                "minimum_should_match": 1
              }
            },
            {
              "range": {
                "@timestamp": {
                  "format": "strict_date_optional_time",
                  "gte": "2023-12-17T20:30:00.000Z",
                  "lte": "2023-12-18T20:29:59.999Z"
                }
              }
            }
          ],
          "should": [],
          "must_not": []
        }
      }
    }
      
    
    return{
        requestBody
        }
      };