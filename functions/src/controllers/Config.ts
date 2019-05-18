import * as functions from 'firebase-functions';

const EnvConfig = {
    domain: functions.config().wapy.domain,
    protocol: functions.config().wapy.protocol,
    secretHeaderValue: functions.config().wapy.header
}

export default EnvConfig;