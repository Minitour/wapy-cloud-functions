import * as admin from 'firebase-admin'
admin.initializeApp();

import GenerateToken from './controllers/GenerateToken'
import UpdateAccount from './controllers/UpdateAccount'
import GetCamera from './controllers/camera/GetCamera';
import CreateCamera from './controllers/camera/CreateCamera';
import UpdateCamera from './controllers/camera/UpdateCamera';

export const generateToken = GenerateToken;
export const updateAccount = UpdateAccount;
export const getCamera = GetCamera;
export const createCamera = CreateCamera;
export const updateCamera = UpdateCamera;