module.exports = (fromDate,toDate)=>{
  const RequestBody= 
  {
    "aggs": {
      "0": {
        "terms": {
          "field": "HttpData.Provider.raw",
          "order": {
            "_count": "desc"
          },
          "size": 5,
          "shard_size": 25
        },
        "aggs": {
          "1": {
            "date_histogram": {
              "field": "@timestamp",
              "calendar_interval": "1m",
              "time_zone": "Asia/Tehran",
              "extended_bounds": {
                "min": 1702192539714,
                "max": 1702196139714
              }
            }
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
                        "exists": {
                          "field": "HttpData.Provider"
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
                            "bool": {
                              "should": [
                                {
                                  "term": {
                                    "HttpData.StatusCode.raw": {
                                      "value": "OK"
                                    }
                                  }
                                }
                              ],
                              "minimum_should_match": 1
                            }
                          },
                          {
                            "bool": {
                              "should": [
                                {
                                  "term": {
                                    "HttpData.StatusCode.raw": {
                                      "value": "Ok"
                                    }
                                  }
                                }
                              ],
                              "minimum_should_match": 1
                            }
                          },
                          {
                            "bool": {
                              "should": [
                                {
                                  "term": {
                                    "HttpData.StatusCode.raw": {
                                      "value": "200"
                                    }
                                  }
                                }
                              ],
                              "minimum_should_match": 1
                            }
                          }
                        ],
                        "minimum_should_match": 1
                      }
                    }
                  }
                },
                {
                  "bool": {
                    "must_not": {
                      "bool": {
                        "should": [
                          {
                            "bool": {
                              "should": [
                                {
                                  "term": {
                                    "HttpData.StatusCode.raw": {
                                      "value": "Forbidden"
                                    }
                                  }
                                }
                              ],
                              "minimum_should_match": 1
                            }
                          },
                          {
                            "bool": {
                              "should": [
                                {
                                  "term": {
                                    "HttpData.StatusCode.raw": {
                                      "value": "403"
                                    }
                                  }
                                }
                              ],
                              "minimum_should_match": 1
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
                "gte": "2023-12-10T07:15:39.714Z",
                "lte": "2023-12-10T08:15:39.714Z"
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
  RequestBody
  }
  // Add more properties as needed
};