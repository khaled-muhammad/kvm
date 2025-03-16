import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAztDOAsuxOt8gITro00uvGWHIbjgrX3lU",
    authDomain: "thoughty-26ca5.firebaseapp.com",
    projectId: "thoughty-26ca5",
    storageBucket: "thoughty-26ca5.firebasestorage.app",
    messagingSenderId: "1058239424757",
    appId: "1:1058239424757:web:d5507c7ad331c07c7f7dbc",
    measurementId: "G-EFGMVQGLBW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };