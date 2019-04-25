import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

/**
 * This function is called by the mobile devices. It is provided with a token (`idToken`).
 * That token is then validated against the firebase server and if valid a custom token will be generated.
 * 
 * @param `idToken` - The identity token of the user.
 * @returns A JSON object with the key `token` if success  or `message` if failed.
 */
export const generateToken = functions.https.onRequest(async (req,res)=> {
    var token = req.body.idToken
    try {
        var decodedToken = await admin.auth().verifyIdToken(token)
        var customToken = await admin.auth().createCustomToken(decodedToken.uid)
        res.statusCode  = 200
        res.send({"token" : customToken})
    }catch (err) {
        res.statusCode = 400
        res.send({"message": "something went wrong."})
    }
})