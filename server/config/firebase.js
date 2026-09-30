import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

let db;
let auth;

try {
  if (process.env.FIREBASE_PROJECT_ID) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace escaped newline characters from env var string
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    db = admin.firestore();
    auth = admin.auth();
    console.log('✅ Firebase Admin initialized');
  } else {
    console.log('⚠️ Firebase credentials missing. Running in demo mode.');
  }
} catch (error) {
  console.error('❌ Firebase Admin initialization error:', error);
}

export { db, auth };
export default admin;
