// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "COLOQUE-AQUI-SUA-CHAVE",
  authDomain: "fmds-crud2.firebaseapp.com",
  projectId: "fmds-crud2",
  storageBucket: "fmds-crud2.appspot.com",
  messagingSenderId: "75564769384",
  appId: "1:75564769384:web:6e58bc065fdae7b2b4dbdd"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();
export default db;