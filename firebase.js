// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxa1DNwM07J1XzLeCI2_F3da9ylzk3hZg",
  authDomain: "tinder-clone-d9124.firebaseapp.com",
  projectId: "tinder-clone-d9124",
  storageBucket: "tinder-clone-d9124.appspot.com",
  messagingSenderId: "732598259976",
  appId: "1:732598259976:web:6d8ecffe544119345e1cbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore();

/*export function signUp(email, password){
    createUserWithEmailAndPassword(auth, email, password);
}

export function signIn(email, password){
    signInWithEmailAndPassword(auth, email, password);
}
*/


