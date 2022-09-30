// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpHQllzvmwS2biXRBUawK4jIdPsB0OdBw",
  authDomain: "nwen304-135s.firebaseapp.com",
  projectId: "nwen304-135s",
  storageBucket: "nwen304-135s.appspot.com",
  messagingSenderId: "599899410706",
  appId: "1:599899410706:web:651f392cca6b55199b63cb",
  measurementId: "G-7C4KERQKYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);