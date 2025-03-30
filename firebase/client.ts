// Import the functions you need from the SDKs you need
import { initializeApp,getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase-admin/firestore";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyC0XAVYucutN_KqGMlyOsDnkY54wDqAHxk",
  authDomain: "prepwise-87113.firebaseapp.com",
  projectId: "prepwise-87113",
  storageBucket: "prepwise-87113.firebasestorage.app",
  messagingSenderId: "459640577699",
  appId: "1:459640577699:web:e00dc22ba5e8ea1b766916",
  measurementId: "G-FMVKTS25QF"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);