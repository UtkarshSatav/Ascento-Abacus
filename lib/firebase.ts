import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCExbjxP3fQPjmBGTv-_hDgwEcTq-9CCgs",
    authDomain: "ascento-abacus-db.firebaseapp.com",
    projectId: "ascento-abacus-db",
    storageBucket: "ascento-abacus-db.firebasestorage.app",
    messagingSenderId: "84010772893",
    appId: "1:84010772893:web:d4dfc1ad702a98d060a774",
    measurementId: "G-WCM0KWVJE7"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Analytics (only on client-side)
let analytics;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, db, auth, analytics };
