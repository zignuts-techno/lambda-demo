"use strict";

let {AWS, UID, Tables, S3URL } = require('../config/constants');
const db = new AWS.DynamoDB.DocumentClient();

module.exports.fn = (event, context, callback) => {

  const timestamp = new Date().getTime();
  
  // Getting the data from the event body
  //console.log(event);
  let data = JSON.parse(event.body);
  
  if(!data || !data.filename){
    // return error as bad request
    let response = {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request. Required parameters missing.' })
    }
    callback(null, response);
    return;
  }else{
    // process further
    let params = {
      TableName: Tables.images,
      Item: {
        id: UID.generate(),
        path: S3URL.concat(data.filename),
        createdAt: timestamp
      }
    };

    db.put(params, (error, result) => {
      if(error){
        console.error(error);
        let response = {
          statusCode: 500,
          body: JSON.stringify({ message: 'Image could not be created.' })
        }
        callback(null, response);
        return;
      }
      console.log(result);
      let response = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: "Image has been posted successfully.",
            image: params.Item,
            result
          },
          null,
          2
        ),
      };
      callback(null, response);
    });
  }
};
