"use strict";

let {AWS, Tables } = require('../config/constants');
const db = new AWS.DynamoDB.DocumentClient();

module.exports.fn = (event, context, callback) => {

  // Preparing the params for scanning the dynamoDB
  let params = {
    TableName: Tables.images,
    ProjectionExpression: "#imageid, #path, createdAt",
    ExpressionAttributeNames:{
      "#imageid": "id",
      "#path": "path"
    },
    ScanIndexForward: true,
  };
  
  db.scan(params, (error, result) => {
    try{
      if(error){ // In case of any error
        console.error(error);
        let response = {
          statusCode: 500,
          body: JSON.stringify({ message: 'Images could not be retrieved.' })
        }
        callback(null, response);
        return;
      }
      //console.log(result);
      // In case of success
      let response = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: "Uploaded Images",
            data: result.Items,
          },
          null,
          2
        ),
      };
      callback(null, response);
    }catch(error){
      console.log(error);
      let response = {
        statusCode: 500,
        body: JSON.stringify({ message: 'Images could not be retrieved.' })
      }
      callback(null, response);
      return;
    }
  });
};
