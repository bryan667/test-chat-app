import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const {
  VITE_REACT_APP_FIREBASE_APIKEY,
  VITE_REACT_APP_FIREBASE_AUTHDOMAIN,
  VITE_REACT_APP_FIREBASE_DATABASEURL,
  VITE_REACT_APP_FIREBASE_PROJECTID,
  VITE_REACT_APP_FIREBASE_STORAGEBUCKET,
  VITE_REACT_APP_FIREBASE_MESSAGINGSENDERID,
  VITE_REACT_APP_FIREBASE_APPID,
} = import.meta.env;

let firebaseConfig = {
  apiKey: VITE_REACT_APP_FIREBASE_APIKEY,
  authDomain: VITE_REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: VITE_REACT_APP_FIREBASE_DATABASEURL,
  projectId: VITE_REACT_APP_FIREBASE_PROJECTID,
  storageBucket: VITE_REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: VITE_REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: VITE_REACT_APP_FIREBASE_APPID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { app, auth, database, storage };
