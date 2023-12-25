module.exports = (fromDate,toDate)=>{
    const requestBody= 
    {
      "aggs": {
        "0": {
          "date_histogram": {
            "field": "@timestamp",
            "fixed_interval": "30m",
            "time_zone": "Asia/Tehran",
            "extended_bounds": {
              "min": 1703449800000,
              "max": 1703536199999
            }
          }
        }
      },
      "size": 0,
      "fields": [
        {
          "field": "@timestamp",
          "format": "date_time"
        },
        {
          "field": "ActivationDate",
          "format": "date_time"
        },
        {
          "field": "CallLog.CreationDate",
          "format": "date_time"
        },
        {
          "field": "CallLog.Date",
          "format": "date_time"
        },
        {
          "field": "CallLog.ExceptionDate",
          "format": "date_time"
        },
        {
          "field": "CallLog.ServiceCallDate",
          "format": "date_time"
        },
        {
          "field": "CreationDate",
          "format": "date_time"
        },
        {
          "field": "ExceptionDetail.Expires",
          "format": "date_time"
        },
        {
          "field": "ExpirationDate",
          "format": "date_time"
        },
        {
          "field": "HttpData.CreationDate",
          "format": "date_time"
        },
        {
          "field": "HttpData.Date",
          "format": "date_time"
        },
        {
          "field": "HttpData.ExceptionDate",
          "format": "date_time"
        },
        {
          "field": "TraceData.RequestTime",
          "format": "date_time"
        },
        {
          "field": "TraceData.ResponseTime",
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
                    "bool": {
                      "must_not": {
                        "bool": {
                          "should": [
                            {
                              "term": {
                                "ExceptionDetail.Type.keyword": {
                                  "value": "Abp.UI.UserFriendlyException"
                                }
                              }
                            }
                          ],
                          "minimum_should_match": 1
                        }
                      }
                    }
                  }
                ]
              }
            },
            {
              "range": {
                "@timestamp": {
                  "format": "strict_date_optional_time",
                  "gte": "2023-12-24T20:30:00.000Z",
                  "lte": "2023-12-25T20:29:59.999Z"
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
        // Add more properties as needed
      };