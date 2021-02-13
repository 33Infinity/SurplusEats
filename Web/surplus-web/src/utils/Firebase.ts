import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCwMd46r3p5zXEyd2ykoI4WMvxCEUcT5Xc",
  authDomain: "surplus-functions.firebaseapp.com",
  databaseURL: "https://surplus-functions.firebaseio.com",
  projectId: "surplus-functions",
  storageBucket: "surplus-functions.appspot.com",
  messagingSenderId: "903548838364",
  appId: "1:903548838364:web:0b830fd96030d8b6646f19",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
