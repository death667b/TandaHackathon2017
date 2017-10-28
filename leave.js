import uuid from "uuid";
import AWS from "aws-sdk";
import rp from "request-promise";
import twilio from 'twilio';

AWS.config.update({ region: "ap-southeast-2" });

var accountID = 'AC1d5cf343f82ccd0c15e44feb15fa6dcc';
var accountAuth = 'afa732887930ef637618e340063d2030';

var client = new twilio(accountID, accountAuth);

export function main(event, context, callback) {
    //const eventBody = event.payload.body;
    
    const date = new Date();
    const startDate = (date.getYear() - 100 ) + '-' + date.getMonth() + '-' + date.getDate();
    const endDate   = (date.getYear() - 100 + 1) + '-' + date.getMonth() + '-' + date.getDate();

    const rpOptions = {
        uri: 'https://my.tanda.co/api/v2/leave',
        qs: {
            'from': startDate.toString(),
            'to': endDate.toString()
        },
        headers: {
            'Authorization': 'Bearer 0f9ea1cdbab7ff28774111c27045f145baafb3c00520e3c73c5763597cd80c76'
        },
        json: true
    };

    rp(rpOptions)
        .then(function (requestEvents) {
            // console.log('User has %d requests', requestEvents.length);

            let pending = 0, approved = 0, declined = 0, minOld = Number.MAX_SAFE_INTEGER;
            //let sendNewSMS = false;

            requestEvents.forEach(reqEvent => {
                //if (reqEvent.status === 'rejected') declined++;
                //if (reqEvent.status === 'approved') approved++;
                if (reqEvent.status === 'pending') {
                    pending++;

                    const editedDate = parseInt(reqEvent.updated_at)*1000;
                    let thisTime = (date.getTime() - editedDate) / 1000 / 60;
                    if (minOld > thisTime) minOld = thisTime;
                }
            })

            if (pending === 1 || minOld>=10) {
                client.messages.create({
                    body: 'There is at least 1 leave request to review',
                    to: '+61423022733',
                    from: '+61447082035'
                  }).then( msg => {
                      const response = {
                          statusCode: 200,
                          body: 'new sms sent'
                      };
                      callback(null, response);
                  });
            }
            //const returnBody = `${minOld} minutes old, There is ${pending} pending, ${approved} approved and ${declined} declined requests for leave`;
            


            const response = {
                statusCode: 200,
                body: '200 but nothing sent'
            };
            callback(null, response);
        })
        .catch(function (err) {
            const response = {
                statusCode: 500,
                body: JSON.stringify(err)
            };
            callback(null, response);
        });


}