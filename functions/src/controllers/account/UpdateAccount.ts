import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


const db = admin.firestore();


const UpdateAccount = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    console.log(data);

    const res = await db.collection('users').doc(context.auth.uid).set(data, { merge: true });
    console.log(res);

    return res;
})

export default UpdateAccount;