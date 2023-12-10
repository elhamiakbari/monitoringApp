module.exports = (fromDate,toDate)=>{
    const requestbody= 
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
                "fixed_interval": "30m",
                "time_zone": "Asia/Tehran",
                "extended_bounds": {
                  "min": 1702153800000,
                  "max": 1702240199999
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
                  "gte": "2023-12-09T20:30:00.000Z",
                  "lte": "2023-12-10T20:29:59.999Z"
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
        requestbody
        }
        // Add more properties as needed
      };