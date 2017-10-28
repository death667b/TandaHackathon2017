import uuid from "uuid";
import AWS from "aws-sdk";
import twilio from 'twilio';

AWS.config.update({ region: "ap-southeast-2" });

var accountID = 'AC1d5cf343f82ccd0c15e44feb15fa6dcc';
var accountAuth = 'afa732887930ef637618e340063d2030';

var client = new twilio(accountID, accountAuth);

export function main(event, context, callback) {
    eventBody = JSON.parse(event.body);
    const twilioPhone = eventBody.payload.body.phone.replace(/ /g, "").replace("0", "+61");
    const returnMessage = eventBody.payload.body.message || 'No Msg';

    client.messages.create({
      body: returnMessage,
      to: twilioPhone,
      from: '+61447082035'
    }).then( msg => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(msg)
        };
        callback(null, response);
    });
}