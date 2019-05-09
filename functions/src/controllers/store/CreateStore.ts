import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { DocumentReference } from '@google-cloud/firestore';

/**
 * 
 */
const CreateStore = functions.https.onCall(async (data,context)=> {

    // data contains:
    // store name
    // store image
    // store location?

    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    const uid = context.auth.uid;
    const db = admin.firestore();

    const storedData: any = {
        owner_uid: uid,
        image: data.image,
        name: data.name,
    }

    try {
        const docRef: DocumentReference = await db.collection('cameras').add(storedData);
        console.log(`Created Camera ${docRef.id}`)
        return { status: 200, message: "Success", generatedId: docRef.id }
    }catch {
        return { status: 400, message: "Unknown error." }
    }
})

export default CreateStore;