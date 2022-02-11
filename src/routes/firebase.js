import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCVKh0YiesZjjJrUO5YRgkynGUuLeJes5w",
    authDomain: "scheduler-f454e.firebaseapp.com",
    projectId: "scheduler-f454e",
    storageBucket: "scheduler-f454e.appspot.com",
    messagingSenderId: "470801378127",
    appId: "1:470801378127:web:8cef52da20a4c19ca6b33a",
    measurementId: "G-CX03SPFYZK"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
