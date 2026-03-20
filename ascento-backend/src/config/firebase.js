const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
};

if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY 
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') 
    : undefined;

  const config = {
    ...firebaseConfig,
  };

  if (privateKey && process.env.FIREBASE_CLIENT_EMAIL) {
    config.credential = admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    });
  }

  admin.initializeApp(config);
}

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

console.log('Firebase initialized successfully for project:', process.env.FIREBASE_PROJECT_ID);

module.exports = {
  admin,
  db,
  auth,
  storage,
};
