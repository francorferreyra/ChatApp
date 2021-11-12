console.log("firebase boot");

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoM1qepbEsROH6NBLjrKLPXXKZ8cjm8p0",
  authDomain: "firechatappquasar.firebaseapp.com",
  projectId: "firechatappquasar",
  storageBucket: "firechatappquasar.appspot.com",
  messagingSenderId: "510830914409",
  appId: "1:510830914409:web:0542929d4d00de0d5c6bf8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const marcaTiempo = firebase.firestore.FieldValue.serverTimestamp;

export { db, auth, marcaTiempo };

