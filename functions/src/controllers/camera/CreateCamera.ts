import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { DocumentReference } from '@google-cloud/firestore';

/**
 * 
 */
const CreateCamera = functions.https.onCall(async (data,context)=> {

    // data contains:
    // - storeId
    // - version

    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    const uid = context.auth.uid;
    const db = admin.firestore();

    const storedData: any = {
        owner_uid: uid,
        version: data.version,
        mmo : {}
    }

    // add store reference if exists
    if (data.storeId) {
        storedData.store = db.doc(`stores/${data.storeId}`)
    }

    try {
        var docRef: DocumentReference = await db.collection('cameras').add(storedData);
        console.log(`Created Camera ${docRef.id}`)
        return { status: 200, message: "Success", generatedId: docRef.id }
    }catch {
        return { status: 400, message: "Unknown error." }
    }
})

export default CreateCamera;