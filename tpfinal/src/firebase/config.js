
import app from 'firebase/app';
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyB8lm3dyFy0F7RmtkNhMABPapsoHdvzrYQ",
  authDomain: "proyectorn-b29f7.firebaseapp.com",
  projectId: "proyectorn-b29f7",
  storageBucket: "proyectorn-b29f7.firebasestorage.app",
  messagingSenderId: "44737632367",
  appId: "1:44737632367:web:1f31b3f1d01b4bfb60559a"
};




app.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();