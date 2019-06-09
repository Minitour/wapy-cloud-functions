import * as admin from 'firebase-admin'
admin.initializeApp();

import GenerateToken from './controllers/account/GenerateToken'
import UpdateAccount from './controllers/account/UpdateAccount'
import GetCamera from './controllers/camera/GetCamera';
import GetCameras from './controllers/camera/GetCameras';
import CreateCamera from './controllers/camera/CreateCamera';
import UpdateCamera from './controllers/camera/UpdateCamera';
import GetStores from './controllers/store/GetStores';
import CreateStore from './controllers/store/CreateStore';
import CreateProduct from './controllers/product/CreateProduct';
import GetProducts from './controllers/product/GetProducts';
import * as cors from 'cors';
import GetDashboard from './controllers/aws/GetDashboard';
import GetBoxDashboard from './controllers/aws/GetBoxDashboard';
import GetProductDashboard from './controllers/aws/GetProductDashboard';
import UpdateCameraStatus from './controllers/camera/UpdateCameraStatus';
import CameraUpdateTrigger from './triggers/CameraUpdateTrigger';
import GetAccountInfo from './controllers/account/GetAccountInfo';
import UpdateProduct from './controllers/product/UpdateProduct';
import DeleteResource from './controllers/account/DeleteResource';
import UpdateStore from './controllers/store/UpdateStore';
cors({ origin: true });

// Account 
export const generateToken = GenerateToken;
export const updateAccount = UpdateAccount;
export const getAccountInfo = GetAccountInfo;
export const deleteResource = DeleteResource;

// Camera 
export const getCamera = GetCamera;
export const getCameras = GetCameras;
export const createCamera = CreateCamera;
export const updateCamera = UpdateCamera;
export const updateCameraStatus = UpdateCameraStatus;

// Store
export const getStores = GetStores;
export const createStore = CreateStore;
export const updateStore = UpdateStore;

// product
export const createProduct = CreateProduct;
export const getProducts = GetProducts;
export const updateProduct = UpdateProduct;
//AWS
export const getDashboard = GetDashboard;
export const getBoxDashboard = GetBoxDashboard;
export const getProductDashboard = GetProductDashboard;

// firestore triggers
export const onCameraUpdate = CameraUpdateTrigger;