// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIvDNoWk9o65Y-8MUOpxEcKvzo1r3rZv0",
  authDomain: "test-950ce.firebaseapp.com",
  projectId: "test-950ce",
  storageBucket: "test-950ce.appspot.com",
  messagingSenderId: "1094288850527",
  appId: "1:1094288850527:web:df662e68c721d29e5165ea",
  measurementId: "G-TST4LN8EKG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
