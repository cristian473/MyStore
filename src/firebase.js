import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig= {
    apiKey: "AIzaSyBT6ytCJTBSoaiYq9cFlBkazH_q9BBs6oM",
    authDomain: "mystore-eba84.firebaseapp.com",
    databaseURL: "https://mystore-eba84.firebaseio.com",
    projectId: "mystore-eba84",
    storageBucket: "mystore-eba84.appspot.com",
    messagingSenderId: "368884795131",
    appId: "1:368884795131:web:f12e4aecd5126e2dd1925e",
    measurementId: "G-18ZS86Z3XZ"
  };
  const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore();