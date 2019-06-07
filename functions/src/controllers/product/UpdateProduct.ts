import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { DocumentSnapshot, DocumentData } from '@google-cloud/firestore';

/**
 * 
 */
const UpdateProduct = functions.https.onCall(async (data, context) => {

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

    const productId = data.productId;

    const updatedData: any = {
        owner_uid: uid
    }

    if (data.image) {
        updatedData.image = data.image;
    }

    if (data.name) {
        updatedData.name = data.name;
    }

    if (data.description) {
        updatedData.description = data.description;
    }

    try {
        const ref = db.collection('cameras').doc(productId);
        const doc: DocumentSnapshot = await ref.get();
        if (doc.exists) {
            const docData = <DocumentData>doc.data();
            const owner_uid = docData.owner_uid;

            if (owner_uid !== uid) {
                // error. Object belongs to another user.
                return { status: 403, message: "The requested resource does not belong to this account." }
            }

            await ref.update(updatedData);
            return { status: 200, message: "Success." }

        } else {
            // return error
            return { status: 404, message: "The requested resource does not exist." }
        }

    } catch {
        return { status: 400, message: "Unknown Error." }
    }
})

export default UpdateProduct;