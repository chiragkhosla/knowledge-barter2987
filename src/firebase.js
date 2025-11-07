import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyALqQrKm5fR0qEZ89jmaq3ulfhWZMwuce4",
  authDomain: "knowledge-barter-99eaa.firebaseapp.com",
  projectId: "knowledge-barter-99eaa",
  storageBucket: "knowledge-barter-99eaa.firebasestorage.app",
  messagingSenderId: "578066923951",
  appId: "1:578066923951:web:b97bee99ea2b12aa2a6f5a",
  measurementId: "G-3RYQX4L3ZB"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);
