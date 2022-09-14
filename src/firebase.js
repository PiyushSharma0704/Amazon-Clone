import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
 import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore, collection, doc, orderBy, onSnapshot  } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCShGb_3IOJuyznOEzCfrSugAyJ2QQGjnE",
  authDomain: "amzclone-a4cfb.firebaseapp.com",
  projectId: "amzclone-a4cfb",
  storageBucket: "amzclone-a4cfb.appspot.com",
  messagingSenderId: "95392809938",
  appId: "1:95392809938:web:fcded1d0d8c7a2876bfe0b",
  measurementId: "G-HW8DBSR0VP"
};    

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const auth = firebase.auth();

  export { db, auth };
