import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.use(firestorePlugin)

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDZN80LeGf2IF2ab7PZwlNMD_SQtK_a7O0",
    authDomain: "shogiboard.firebaseapp.com",
    databaseURL: "https://shogiboard.firebaseio.com",
    projectId: "shogiboard",
    storageBucket: "shogiboard.appspot.com",
    messagingSenderId: "168671221298",
    appId: "1:168671221298:web:082e1d84a23cf6a5f7ce2b",
    measurementId: "G-R6YKTDL951"
});

export const db = firebaseApp.firestore();