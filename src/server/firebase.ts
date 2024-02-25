import { env } from '@/env';
import { getFirestore } from 'firebase-admin/firestore';
import { getApp, getApps, initializeApp } from 'firebase-admin/app';

const firebaseConfig = {
  apiKey: env.FIREBASE_APIKEY,
  authDomain: env.FIREBASE_AUTHDOMAIN,
  projectId: env.FIREBASE_PROJECTID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_SENDERID,
  appId: env.FIREBASE_APPID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);

export { firestore };
