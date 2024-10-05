// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-librariee


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyC4rtAp2nQopgwBd5oAGdVj0R_EtRro_co",

  authDomain: "slide-258f6.firebaseapp.com",

  projectId: "slide-258f6",

  storageBucket: "slide-258f6.appspot.com",

  messagingSenderId: "562646228405",

  appId: "1:562646228405:web:a5cc22992db37bc2ef8dfc",

  measurementId: "G-R34LWECV95"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);