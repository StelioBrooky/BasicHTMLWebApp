// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
const {initializeApp} = require("firebase/app");
//import { getAnalytics } from "firebase/analytics";
//import { getDatabase, ref, set, child, update, remove } from "firebase/database";
const {getDatabase} = require("firebase/database");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
module.exports = function StartFirebase(){
const firebaseConfig = {
  apiKey: "AIzaSyCpHQllzvmwS2biXRBUawK4jIdPsB0OdBw",
  authDomain: "nwen304-135s.firebaseapp.com",
  projectId: "nwen304-135s",
  storageBucket: "nwen304-135s.appspot.com",
  messagingSenderId: "599899410706",
  databaseURL: "https://nwen304-135s-default-rtdb.asia-southeast1.firebasedatabase.app",
  appId: "1:599899410706:web:651f392cca6b55199b63cb",
  measurementId: "G-7C4KERQKYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

  return getDatabase(app);

}

//export default StartFirebase;
