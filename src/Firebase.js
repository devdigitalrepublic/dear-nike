import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";


var firebaseConfig = {
  apiKey: "AIzaSyCDidkLg71sWUcecXsTpn3sPfJmDXE0ukg",
  authDomain: "wheredoctor-180002.firebaseapp.com",
  databaseURL: "https://wheredoctor-180002.firebaseio.com",
  projectId: "wheredoctor-180002",
  storageBucket: "wheredoctor-180002.appspot.com",
  messagingSenderId: "347096895724",
  appId: "1:347096895724:web:5e0d266941f2518997d5c9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;