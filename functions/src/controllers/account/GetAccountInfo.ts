import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


const db = admin.firestore();


const GetAccountInfo = functions.https.onCall(async (data,context)=> {
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    const resdata = (await db.collection('users').doc(context.auth.uid).get()).data();
    
    return { message: 'Success', code: 200, data: resdata }
})

export default GetAccountInfo;