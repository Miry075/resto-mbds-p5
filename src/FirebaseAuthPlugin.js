import Firebase from "firebase";
import store from "./store"
// FIREBASE INIT
var config = {
  apiKey: "AIzaSyBoOMetLGKFPqcNNU3W3H9FMVDPMbDF-NE",
  authDomain: "restaurant-1f0e7.firebaseapp.com",
  databaseURL: "https://restaurant-1f0e7.firebaseio.com",
  projectId: "restaurant-1f0e7",
  storageBucket: "restaurant-1f0e7.appspot.com",
  messagingSenderId: "742376087926"
};

//var firebaseApp = Firebase.initializeApp(config);

//export const db = firebaseApp.database();

export default {
  install: (Vue, options) => {
    console.log("firebase auth plugin")
    const firebase = !Firebase.apps.length ? Firebase.initializeApp(config) : Firebase.app()
    const auth = firebase.auth()
    Vue.prototype.$auth = {
      login: (email, pass) => {
        console.log("Login here");
        var au = auth.signInWithEmailAndPassword(email, pass);
        au.then(
          (user) => {
            location.reload();
          },
          (err) => {
            alert("Erreur login:" + err);
          }
        );

        return au;
      },
      register: (email, pass, firstname, lastname) => {
        // auth.createUserWithEmailAndPassword(email, pass).then(
        //   (user) => {
        //     console.log("user>" + user);
        //     firebase.database().ref('users/' + user.uid).set({
        //       firstname: firstname,
        //       lastname: lastname
        //     })
        //     ///     location.reload();
        //   },
        //   (err) => {
        //     alert("Error subscribe " + err);
        //   }
        // );


        auth.createUserWithEmailAndPassword(email, pass)
          .then(function (firebaseUser) {
            console.log("User " + firebaseUser.user.uid + " created successfully!");
            firebase.database().ref('users/' + firebaseUser.user.uid).set({
              firstname: firstname,
              lastname: lastname
            })
            location.reload();
          }).catch(function (error) {
            alert(error)
          });

      },
      logout: function () {
        auth.signOut()
      }
    }
    auth.onAuthStateChanged(user => {
      store.commit('updateUser', { user })
    })
  }
}