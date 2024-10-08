import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_APP_DATABASE_URL,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket:import.meta.env.VITE_APP_STORAGEBUCKET,
    messagingSenderId:import.meta.env.VITE_APP_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APP_APP_ID,
    measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID
  };
  console.log("fireBase",firebaseConfig)
const app = initializeApp(firebaseConfig)
const auth =getAuth(app)
export const db = getFirestore(app);
export default auth;