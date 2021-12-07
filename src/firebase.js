import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDb6Jd92Y1MZRPSsgdgFKlmAQykiLDLi7k",
    authDomain: "reactbook-october-derek.firebaseapp.com",
    projectId: "reactbook-october-derek",
    storageBucket: "reactbook-october-derek.appspot.com",
    messagingSenderId: "686617177261",
    appId: "1:686617177261:web:630dbf1f8d0f10306c6a24",
    measurementId: "${config.measurementId}"
};

const firebase = initializeApp(firebaseConfig);

export default firebase;