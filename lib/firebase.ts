import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCExbjxP3fQPjmBGTv-_hDgwEcTq-9CCgs",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "ascento-abacus-db.firebaseapp.com",
  databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ascento-abacus-db"}-default-rtdb.firebaseio.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ascento-abacus-db",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "ascento-abacus-db.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "84010772893",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:84010772893:web:d4dfc1ad702a98d060a774",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-WCM0KWVJE7"
};

if (typeof window !== "undefined") {
  console.log("🔥 Initializing Firebase with project:", firebaseConfig.projectId);
}

// Initialize Firebase (SSR Safe)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Analytics selectively
if (typeof window !== "undefined") {
    isSupported().then(yes => {
        if (yes) getAnalytics(app);
    });
}

export { app, auth, db, googleProvider };
