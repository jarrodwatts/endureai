import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

// Create Client-Side Instance of Firebase
function initializeFirebaseClient(): {
  db: Firestore;
  auth: Auth;
  firebaseApp: FirebaseApp;
} {
  const firebaseApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
  });

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  return {
    db,
    auth,
    firebaseApp,
  };
}

const firestore = initializeFirebaseClient().db;
const auth = initializeFirebaseClient().auth;
const firebaseApp = initializeFirebaseClient().firebaseApp;

export { firestore, auth, firebaseApp };
