import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


const db = admin.firestore();

/**
 * This function is called by the mobile devices. It is provided with a token (`idToken`).
 * That token is then validated against the firebase server and if valid a custom token will be generated.
 * 
 * @returns A JSON object with the key `token` if success  or `message` if failed.
 */
const UpdateAccount = functions.https.onCall(async (data,context)=> {
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    return await db.collection('users').doc(context.auth.uid).set(data,{merge: true});
})

export default UpdateAccount;