import uuid from "uuid";
import AWS from "aws-sdk";
import rp from "request-promise";

AWS.config.update({ region: "ap-southeast-2" });


export function main(event, context, callback) {
    const eventBody = event.payload.body;
    
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
            console.log('User has %d repos', requestEvents.length);

            let pending = 0, approved = 0, declined = 0;

            requestEvents.forEach(reqEvent => {
                if (reqEvent.status === 'rejected') declined++;
                if (reqEvent.status === 'approved') approved++;
                if (reqEvent.status === 'pending') pending++;
            })

            const returnBody = `There is ${pending} pending, ${approved} approved and ${declined} declined requests for leave`;

            const response = {
                statusCode: 200,
                body: returnBody
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