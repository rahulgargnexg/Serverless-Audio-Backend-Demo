'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    console.error('validation failed' , event);
    const data = JSON.parse(event.body);

    if(typeof data.url !== 'string'){
        console.error('validation failed');
        callback(new Error('couldnt create the audio'));
        return;
    } 

    const params = {
        TableName : 'Audios',
        Item: {
            id : uuid.v1(),
            url : data.url,
            checked : false,
            createdAt : timestamp,
            updatedAt : timestamp
        }
    };
    dynamoDb.put(params, (error, result) =>{
        if(error){
            console.error(error);
            callback(new Error("couldn't create the todo item."));
            return;
        }
        const response = {
            statusCode: 200, 
            body: JSON.stringify(result.Item)
        }
        callback(null, response);
    });
}