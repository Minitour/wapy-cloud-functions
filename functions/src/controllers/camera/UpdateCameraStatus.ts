import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { DocumentData } from '@google-cloud/firestore';

/**
 * 
 */
const UpdateCameraStatus = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const db = admin.firestore();
    const uid = context.auth.uid;
    const cameraId = data.cameraId;
    const status = data.status;

    if (status == undefined) {
        return { status: 400, message: "Invalid input." }
    }

    const updatedData: any = { camera_enabled: status };

    // select * from firestore.cameras where _id = cameraId and owner_uid = uid

    try {
        const ref = db.collection('cameras').doc(cameraId);
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

export default UpdateCameraStatus;