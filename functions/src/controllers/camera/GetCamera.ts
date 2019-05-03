import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

/**
 * 
 */
const GetCamera = functions.https.onCall(async (data,context)=> {

    // { "cameraID" : "34234234234"}

    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const uid = context.auth.uid;
    const cameraId = data.cameraId;
    const db = admin.firestore();

    // select * from firestore.cameras where _id = cameraId and owner_uid = uid
    
    try {
        console.log(`Fetching document with id ${cameraId}`)
        const doc: DocumentSnapshot = await db.collection('cameras').doc(cameraId).get();
        if (doc.exists) {
            const docData = <any> doc.data();
            console.log(`data found ${JSON.stringify(docData)}`);
            const owner_uid = docData.owner_uid;

            if (owner_uid !== uid) {
                // error. Object belongs to another user.
                return { status: 403, message: "The requested resource does not belong to this account." }
            }

            docData.id = cameraId;
            // return data
            return { status: 200, message: "Success.", data: docData }
        } else {
            // return error
            return { status: 404, message: "The requested resource does not exist." }
        }

    }catch {
        return { status: 400, message: "Unknown Error." }
    }
    
})

export default GetCamera;