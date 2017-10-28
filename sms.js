import uuid from "uuid";
import AWS from "aws-sdk";

AWS.config.update({ region: "ap-southeast-2" });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    const params = {
        Item: 'test test'
    };
    // Return status code 200 and the newly created item
    const response = {
        statusCode: 200,
        body: JSON.stringify(params.Item)
    };
    callback(null, response);
}