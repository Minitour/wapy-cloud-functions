import * as functions from 'firebase-functions';
import EnvConfig from '../Config';
import fetch from 'node-fetch';

/**
 * 
 */
const GetDashboard = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const uid = context.auth.uid;

    data.owner_uid = uid;
    console.log(`Sending ${JSON.stringify(data)}`);
    const response = await fetch(`${EnvConfig.protocol}://${EnvConfig.domain}/dashboard`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'secret': EnvConfig.secretHeaderValue
        },
    }).then(res => res.json());
    console.log(`Received ${JSON.stringify(response)}`);

    return response;

})

export default GetDashboard;