// Make sure Firebase scripts are already loaded in your HTML:
// - firebase-app-compat.js
// - firebase-auth-compat.js
// - firebase-firestore-compat.js

const firebaseConfig = {
  apiKey: "AIzaSyCX7PZbkD1n1OQtVsO8ZCw78qtMe2TV5-I",
  authDomain: "speak-your-order.firebaseapp.com",
  projectId: "speak-your-order",
  storageBucket: "speak-your-order.appspot.com",
  messagingSenderId: "222580529921",
  appId: "1:222580529921:web:bf3af4ae687f487a5d9900",
  measurementId: "G-YF4FCV3D4T"
};

// Initialize Firebase using compat syntax
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
