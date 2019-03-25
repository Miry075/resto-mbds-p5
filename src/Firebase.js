import Firebase from "firebase";
// FIREBASE INIT
var config = {
  apiKey: "AIzaSyBoOMetLGKFPqcNNU3W3H9FMVDPMbDF-NE",
  authDomain: "restaurant-1f0e7.firebaseapp.com",
  databaseURL: "https://restaurant-1f0e7.firebaseio.com",
  projectId: "restaurant-1f0e7",
  storageBucket: "restaurant-1f0e7.appspot.com",
  messagingSenderId: "742376087926"
};

var firebaseApp = Firebase.initializeApp(config);

export const db = firebaseApp.database();