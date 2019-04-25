import * as admin from 'firebase-admin'
admin.initializeApp();

import GenerateToken from './controllers/GenerateToken'
import UpdateAccount from './controllers/UpdateAccount'

export const generateToken = GenerateToken;
export const updateAccount = UpdateAccount;