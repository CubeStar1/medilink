import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCSY8Hf1O5qraoyFKFIp8tiMt2Vp2Lo03c",
    authDomain: "medilink-eb6ca.firebaseapp.com",
    projectId: "medilink-eb6ca",
    storageBucket: "medilink-eb6ca.firebasestorage.app",
    messagingSenderId: "892460668897",
    appId: "1:892460668897:web:fcc955757daa163d34a4a0",
    measurementId: "G-B6YJX3DN93"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage }; 