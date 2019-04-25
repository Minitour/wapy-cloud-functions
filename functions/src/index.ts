import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


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