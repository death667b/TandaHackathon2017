import uuid from "uuid";
import AWS from "aws-sdk";
import twilio from 'twilio';

AWS.config.update({ region: "ap-southeast-2" });

var accountID = 'AC1d5cf343f82ccd0c15e44feb15fa6dcc';
var accountAuth = 'afa732887930ef637618e340063d2030';

var client = new twilio(accountID, accountAuth);

export function main(event, context, callback) {
    const eventBody = JSON.parse(event.body).payload.body;

    const twilioPhone = eventBody.phone.replace(/ /g, "").replace("0", "+61");
    const passcode = eventBody.passcode;
    const name = eventBody.name;

    const returnMessage = `Hello ${name}, your passcode is ${passcode}`;

    client.messages.create({
      body: returnMessage,
      to: twilioPhone,
      from: '+61447082035'
    }).then( msg => {
        const response = {
            statusCode: 200,
            body: 'worked'
        };
        callback(null, response);
    });
}