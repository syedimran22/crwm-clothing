import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const config = {
    apiKey: "AIzaSyDgW9e8WUJvXoAHXeGVUg11Bg_FeHxavgo",
    authDomain: "crwn-db-4c07f.firebaseapp.com",
    projectId: "crwn-db-4c07f",
    storageBucket: "crwn-db-4c07f.appspot.com",
    messagingSenderId: "204738936459",
    appId: "1:204738936459:web:e0a4ca528ea91af2f69e8e",
    measurementId: "G-SDSEJVBL8H"
  }; 


 const app = initializeApp(config);
 export const auth = getAuth(app);

 const provider = new GoogleAuthProvider();
 provider.setCustomParameters({ prompt: 'select_account' });
 export const signInWithGoogle = () => {
   signInWithPopup(auth, provider)
 };
