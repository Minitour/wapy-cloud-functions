import * as admin from 'firebase-admin'
admin.initializeApp();

import GenerateToken from './controllers/GenerateToken'
import UpdateAccount from './controllers/UpdateAccount'
import GetCamera from './controllers/camera/GetCamera';
import CreateCamera from './controllers/camera/CreateCamera';
import UpdateCamera from './controllers/camera/UpdateCamera';
import GetStores from './controllers/store/GetStores';
import CreateStore from './controllers/store/CreateStore';
import CreateProduct from './controllers/product/CreateProduct';
import GetProducts from './controllers/product/GetProducts';
import * as cors from 'cors';
cors({ origin: true });

// Account 
export const generateToken = GenerateToken;
export const updateAccount = UpdateAccount;

// Camera 
export const getCamera = GetCamera;
export const createCamera = CreateCamera;
export const updateCamera = UpdateCamera;

// Store
export const getStores = GetStores;
export const createStore = CreateStore;

// product
export const createProduct = CreateProduct;
export const getProducts = GetProducts;