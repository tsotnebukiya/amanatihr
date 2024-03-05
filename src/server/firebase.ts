import * as admin from 'firebase-admin';
import { env } from '@/env';

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.FIREBASE_PROJECTID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    databaseURL: `https://${env.FIREBASE_PROJECTID}.firebaseio.com`,
  });
}

const firestore = admin.firestore();
export { firestore, admin };
