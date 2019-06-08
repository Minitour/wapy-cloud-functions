import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { DocumentReference } from '@google-cloud/firestore';

/**
 * 
 */
const CreateProduct = functions.https.onCall(async (data,context)=> {

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
        created_at: admin.firestore.Timestamp.fromDate(new Date()),
        image : data.image,
        name: data.name,
        description: data.description
    }

    try {
        const docRef: DocumentReference = await db.collection('products').add(storedData);
        console.log(`Created product ${docRef.id}`)
        return { status: 200, message: "Success", generatedId: docRef.id }
    }catch (e){
        console.log(e);
        return { status: 400, message: "Unknown error." }
    }
})

export default CreateProduct;