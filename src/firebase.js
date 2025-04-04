import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARWw5nfquSdaLjHj11dvk8TIUZ5egR4t8",
  authDomain: "workflow-management-a5789.firebaseapp.com",
  projectId: "workflow-management-a5789",
  storageBucket: "workflow-management-a5789.firebasestorage.app",
  messagingSenderId: "345015506245",
  appId: "1:345015506245:web:38b1ecf6f2e5be7247da2c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
