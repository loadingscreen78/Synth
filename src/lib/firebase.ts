// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbYyGIto_QdhFMTYG9GTqx5B_ug1I2Hn8",
  authDomain: "carbon-credit-8182f.firebaseapp.com",
  projectId: "carbon-credit-8182f",
  storageBucket: "carbon-credit-8182f.firebasestorage.app",
  messagingSenderId: "78459719391",
  appId: "1:78459719391:web:4092b0a570c0771df3236a",
  measurementId: "G-DDJX39ZZM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;
