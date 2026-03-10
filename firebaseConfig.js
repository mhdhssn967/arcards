// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlvCd7GblYcJAVKTWjMyM8Wwk1ehCQC4A",
  authDomain: "ar-flash-cards.firebaseapp.com",
  projectId: "ar-flash-cards",
  storageBucket: "ar-flash-cards.firebasestorage.app",
  messagingSenderId: "844789383381",
  appId: "1:844789383381:web:193a730fe12d94cfbf625c",
  measurementId: "G-Z5SEGG74CC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);