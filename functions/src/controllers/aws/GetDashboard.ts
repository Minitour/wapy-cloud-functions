import * as functions from 'firebase-functions';

/**
 * 
 */
const GetDashboard = functions.https.onCall(async (data,context)=> {
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const uid = context.auth.uid;
    
    return uid;
    
})

export default GetDashboard;