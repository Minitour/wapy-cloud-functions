import * as functions from 'firebase-functions';
import EnvConfig from '../Config';
import fetch from 'node-fetch';

/**
 * 
 */
const GetProductDashboard = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const uid = context.auth.uid;
    const productId = data.productId;

    delete data.productId;
    data.owner_uid = uid;
    console.log(`Sending ${JSON.stringify(data)}`);
    const response = await fetch(`${EnvConfig.protocol}://${EnvConfig.domain}/product/${productId}`, {
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

export default GetProductDashboard;