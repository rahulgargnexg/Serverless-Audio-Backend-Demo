'use strict';


const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = (event, context, callback) => {
    const params = {
        TableName : 'Audios',
    }

    dynamoDb.get(params, (error, result) =>{
        if(error){
            console.error(error);
            callback(new Error("couldn't create the audio item."));
            return;
        }
        const response = {
            statusCode: 200, 
            body: JSON.stringify(result.Item)
        }
        callback(null, response);
    });
}

module.exports.get = (event, context, callback) => {

    console.log(event);
    const params = {
        TableName : 'Audios',
        Key: {
            id : event.pathParameters.id
        }
    }
    dynamoDb.get(params, (error, result) =>{
        if(error){
            console.error(error);
            callback(new Error("couldn't create the audio item."));
            return;
        }
        const response = {
            statusCode: 200, 
            body: JSON.stringify(result.Item)
        }
        callback(null, response);
    });
}

module.exports.getArray = (event, context, callback) => {

    console.log(event);
    // const params = {
    //     TableName : 'Audios',
    //     Key: [
    //         {
    //         id : "12011510-ea31-11eb-ba35-3d200ac364d3"
    //         },
    //         {
    //         id : "f17d42a0-ea30-11eb-ba35-3d200ac364d3"
    //         }
    //     ]
    // }
    var params = {
        RequestItems: {
          'Audios': {
            Keys: [
                {
                    id : "12011510-ea31-11eb-ba35-3d200ac364d3"
                    },
                    {
                    id : "f17d42a0-ea30-11eb-ba35-3d200ac364d3"
                    }
            ]
          }
        }
      };
    documentClient.batchGet(params, (error, result) =>{
        if(error){
            console.error(error);
            callback(new Error("couldn't create the audio item."));
            return;
        }
        const response = {
            statusCode: 200, 
            body: JSON.stringify(result.Item)
        }
        callback(null, response);
    });
}