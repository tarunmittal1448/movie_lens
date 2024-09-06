// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "your api key",
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "movie-lens-c5cd4.firebaseapp.com",
  projectId: "movie-lens-c5cd4",
  storageBucket: "movie-lens-c5cd4.appspot.com",
  messagingSenderId: "693551924610",
  appId: "1:693551924610:web:54e54004106f36b1af3b9b",
  measurementId: "G-ZYNXEN15MZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export { provider, app, auth, db };
