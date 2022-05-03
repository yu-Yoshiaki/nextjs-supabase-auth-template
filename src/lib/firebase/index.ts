// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE as string,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID as string,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURE as string,
};

export const app = initializeApp(firebaseConfig);

// export const analytics = getAnalytics(app);
