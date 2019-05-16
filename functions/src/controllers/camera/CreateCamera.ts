import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { DocumentReference } from '@google-cloud/firestore';
import { v4 as uuid } from 'uuid';
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
        mmo : data.mmo,
        secret: uuid(),
        created_at: admin.firestore.Timestamp.fromDate(new Date())
    }
    if (data.name){
        storedData['name'] = data.name;
    }

    if (data.version) {
        storedData['version'] = data.version;
    }

    if (data.image) {
        storedData['image'] = data.image;
    }

    // add store reference if exists
    if (data.storeId) {
        storedData.store = db.doc(`stores/${data.storeId}`)
    }

    try {
        const docRef: DocumentReference = await db.collection('cameras').add(storedData);
        console.log(`Created Camera ${docRef.id}`)
        return { status: 200, message: "Success", generatedId: docRef.id }
    }catch(e){
        console.log(e);
        return { status: 400, message: "Unknown error." }
    }
})

export default CreateCamera;