请求方式：post

请求接口：localhost:8868/api/getDocumentsByFilterColumn

请求参数：

{ "filters":[ {"field":"address", "value":"中山大道"  }] , "collectionName":"user", "fields":["college", "address", "city", "shool", "password", "school", "phone","name", "state", "department","age","card","email"], "pageSize":25, "currentPage":1} 

返回值：

{  "code": 200,

  "msg": "接口调用成功",

  "data": {   "data": [ 

 {

​        "_id": {

​          "timestamp": 1737702785,

​          "date": "2025-01-24T07:13:05.000+00:00"

​        },

​        "name": "小张",

​        "email": "1381dfge2345555@seito.com",

​        "password": "157ffdd",

​        "school": "广东省体育学院",

​        "department": "设计部",

​        "phone": "13812345678",

​        "address": "中山大道",

​        "city": "上海"

​      },

​      {

​        "_id": {

​          "timestamp": 1737702785,

​          "date": "2025-01-24T07:13:05.000+00:00"

​        },

​        "name": "小张",

​        "email": "113576e563448@163.com",

​        "password": "1fkdlue",

​        "school": "广东省体育学院",

​        "department": "测试部",

​        "phone": "13812345555",

​        "address": "中山大道",

​        "city": "深圳"

​      }

​    ],

​    "totalCount": 17

  }

}

 

 

请求方式：get

请求接口：localhost:8868/api/getAllMongodbCollections

请求参数：无

返回值类型：

{

  "code": 200,

  "msg": "接口调用成功",

  "data": {

​    "db_kafka": [

​      "user",

​      "card",

​      "mycoll",

​      "book"

​    ]

  }

}

 

 

请求方式：get

请求接口：localhost:8868/api/getAllColumns?collectionName=user

请求参数：collectionName=user

返回值：

{

  "code": 200,

  "msg": "接口调用成功",

  "data": {

​    "user": [  "college",  "address",   "city",  "shool",   "password", "school", "phone", "name",  "state",   "department",  "age",  "card",   "email"  ]

  }

}

 

 

请求方式：post

请求接口：localhost:8868/api/getFeildListAndCount

请求参数：

 {  "currentField":"name",  "value":"小",

  "collectionName":"user",

  "fields":["college", "address", "city", "shool", "password", "school", "phone", "name", "state", "department"],

  "filters":[{"field": "address", "value": "大道南山士"}]

 }

返回值：

{

  "code": 200,

  "msg": "接口调用成功",

  "data": [

​    {

​      "name": "小红",

​      "count": 7

​    },

​    {

​      "name": "小张",

​      "count": 5

​    },

​    {

​      "name": "小王",

​      "count": 4

​    },

​    {

​      "name": "小明",

​      "count": 4

​    },

​    {

​      "name": "小刚",

​      "count": 1

​    }

  ]

}

 

 

 

 

 