import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

/**
 * This function is called by the mobile devices.
 * That token is then validated against the firebase server and if valid a custom token will be generated.
 * 
 * @returns A JSON object with the key `token` if success  or `message` if failed.
 */
const GenerateToken = functions.https.onCall(async (data,context)=> {
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const uid = context.auth.uid;
    console.log(`uid: ${uid}`);
    try {
        const customToken = await admin.auth().createCustomToken(uid);
        console.log(customToken);
        return {"token" : customToken}
    }catch (err) {
        console.log(err);
        return {"message": "something went wrong."}
    }
})

export default GenerateToken;