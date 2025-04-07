// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjeku_Y4pQ-qdccX40X1rx71m87hMQE6I",
  authDomain: "expenses-16bd9.firebaseapp.com",
  projectId: "expenses-16bd9",
  storageBucket: "expenses-16bd9.firebasestorage.app",
  messagingSenderId: "476820074366",
  appId: "1:476820074366:web:c1fad1aa4e4a07264fcd2f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
