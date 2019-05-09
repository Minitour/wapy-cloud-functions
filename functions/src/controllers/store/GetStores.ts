import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

/**
 * 
 */
const GetStores = functions.https.onCall(async (data, context) => {

    // { "cameraID" : "34234234234"}

    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const uid = context.auth.uid;
    const db = admin.firestore();

    // select * from firestore.cameras where _id = cameraId and owner_uid = uid

    try {
        const snapshot = await db.collection('store').where('owner_uid', '==', uid).get()
        const stores = Array();
        snapshot.docs.forEach(doc => {
            const elements = doc.data()
            const id = doc.id;
            stores.push({ id: id, image: elements.image, name: elements.name, owner_uid: uid })
        })
        return { status: 200, message: "Ok", data: stores}
    } catch {
        return { status: 400, message: "Unknown Error." }
    }

})

export default GetStores;