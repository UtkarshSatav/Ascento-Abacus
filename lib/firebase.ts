import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAZjKKLfWUyI2NHnr0IcDz_pYrKe6SIov0",
  authDomain: "acento-abacus.firebaseapp.com",
  databaseURL: "https://acento-abacus-default-rtdb.firebaseio.com",
  projectId: "acento-abacus",
  storageBucket: "acento-abacus.firebasestorage.app",
  messagingSenderId: "1005535318576",
  appId: "1:1005535318576:web:3d1ff136c5d54e268a53f5",
  measurementId: "G-5QPYKNZ9E4"
};

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
