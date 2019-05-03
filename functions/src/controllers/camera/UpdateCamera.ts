import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { DocumentData } from '@google-cloud/firestore';

/**
 * 
 */
const UpdateCamera = functions.https.onCall(async (data,context)=> {
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const uid = context.auth.uid;
    const cameraId = data.cameraId;
    const mapModelObject = data.mmo;
    const db = admin.firestore();

    // select * from firestore.cameras where _id = cameraId and owner_uid = uid
    
    try {
        const ref = db.collection('cameras').doc(cameraId);
        const doc: DocumentSnapshot = await ref.get();
        if (doc.exists) {
            const data = <DocumentData> doc.data();
            const owner_uid = data.owner_uid;

            if (owner_uid !== uid) {
                // error. Object belongs to another user.
                return { status: 403, message: "The requested resource does not belong to this account." }
            }

            ref.update({mmo: mapModelObject})
            
        } else {
            // return error
            return { status: 404, message: "The requested resource does not exist." }
        }

    }catch {
        return { status: 400, message: "Unknown Error." }
    }
    
})

export default UpdateCamera;