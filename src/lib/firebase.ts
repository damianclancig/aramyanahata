
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import * as dotenv from 'dotenv';

// Explicitly load environment variables from .env file
dotenv.config();

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

function initializeFirebase() {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };

    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      throw new Error("Missing Firebase configuration. Please set up your .env file with the required FIREBASE_ variables.");
    }
  
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
    db = getFirestore(app);
}

// This is the function that should be used across the app
export function getDb() {
    if (!db) {
        initializeFirebase();
    }
    return db as Firestore;
}
