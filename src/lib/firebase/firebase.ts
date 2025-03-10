// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "@firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATbd227CuxTWZm7h34-r2y7PLCBiMXhmA",
    authDomain: "finance-tracker-bd8a2.firebaseapp.com",
    projectId: "finance-tracker-bd8a2",
    storageBucket: "finance-tracker-bd8a2.firebasestorage.app",
    messagingSenderId: "82454281650",
    appId: "1:82454281650:web:ba7f569b46cde33edfb8ab",
    measurementId: "G-J072S9RP2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth=getAuth(app);

export {app,db,auth}

export const signUpWithEmailPassword = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithEmailPassword = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully");
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

