import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

/**
 * This function is called by the mobile devices. It is provided with a token (`idToken`).
 * That token is then validated against the firebase server and if valid a custom token will be generated.
 * 
 * @returns A JSON object with the key `token` if success  or `message` if failed.
 */
export const generateToken = functions.https.onCall(async (data,context)=> {
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const uid = context.auth.uid;
    try {
        var customToken = await admin.auth().createCustomToken(uid);
        return {"token" : customToken}
    }catch (err) {
        return {"message": "something went wrong."}
    }
})