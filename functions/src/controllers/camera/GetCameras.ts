import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

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
    const storeId = data.storeId;
    const db = admin.firestore();

    // select * from firestore.cameras where _id = cameraId and owner_uid = uid
    
    try {
        const storeRef = db.collection('stores').doc(storeId);
        const query = await db.collection('cameras')
                        .where('owner_uid','==',uid)
                        .where('store','==',storeRef)
                        .get();

        if (!query.empty) {
            console.log(`Found documents: ${query.size}`)
            const result = Array();
            query.forEach(doc => {
                const fields = doc.data();
                const id = doc.id;
                result.push({
                    id: id,
                    heatmap: fields.heatmap,
                    image: fields.image,
                    mmo: fields.mmo,
                    name: fields.name,
                    version: fields.version
                })
            });
            // return data
            return { status: 200, message: "Success.", data: result }
        } else {
            // return error
            console.log("query is empty.")
            return { status: 404, message: "The requested resource does not exist." }
        }

    }catch {
        return { status: 400, message: "Unknown Error." }
    }
    
})

export default GetCamera;