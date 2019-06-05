import * as functions from 'firebase-functions';

export default functions.firestore
    .document('cameras/{cameraId}')
    .onUpdate((change, context) => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const newValue = change.after.data();

        // ...or the previous value before this update
        const oldValue = change.before.data();

        if (oldValue == undefined || newValue == undefined) {
            return null;
        }

        const compareKeys = ['camera_enabled','last_ping']


        var shouldReturn = true;

        for (let key of compareKeys) {
            let nValue = newValue[key];
            let oValue = oldValue[key];

            if (nValue !== oValue) {
                shouldReturn = false;
                break
            }
        }

        // exit
        if (shouldReturn) {
            return null;
        }

        // update document timestamp.
        return change.after.ref.update({ _updateTime: new Date().getTime() });

    });
