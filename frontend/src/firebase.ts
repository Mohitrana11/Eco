import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,

  // apiKey: "AIzaSyBcYRtruoPxHNltBGaAu8aMbidGjF1qfFg",
  // authDomain: "eco-project-b18cc.firebaseapp.com",
  // projectId: "eco-project-b18cc",
  // storageBucket: "eco-project-b18cc.firebasestorage.app",
  // messagingSenderId: "16197708022",
  // appId: "1:16197708022:web:8ffe0faf774ba586e5e4d7",
  // measurementId: "G-F8F8WY1EPZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
